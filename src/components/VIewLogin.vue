<template>
    <div class="box">
        <div :class="state.cla">
            <!-- 注册 -->
            <div class="container__form container--signup">
                <form class="form">
                    <h2 class="form__title">注册</h2>
                    <input type="text" placeholder="User" class="input" v-model="state.LoUser" />
                    <input type="password" placeholder="Password" class="input" v-model="state.LoPasd" />
                    <input type="email" placeholder="Code" class="input" style="width: 150px; margin-left: -133px;"
                        v-model="state.code" />
                    <div @click="refreshCode()" style="margin-left: 185px; margin-top: -49px;">
                        <SIdentify :identifyCode="state.identifyCode"></SIdentify>
                    </div>

                    <button class="btn" type='button' @click="goLogin()">注册</button>
                </form>
            </div>
            <!-- 登录 -->
            <div class="container__form container--signin">
                <form class="form">
                    <h2 class="form__title">登录</h2>
                    <input type="email" placeholder="User" class="input" v-model="state.user" />
                    <input type="password" placeholder="Password" class="input" v-model="state.pasd" />
                    <a class="link">Forgot your password?</a>
                    <button class="btn" type="button" @click="onLogin()">登录</button>

                </form>
            </div>
            <!-- 点击切换 -->
            <div class="container__overlay">
                <div class="overlay">
                    <div class="overlay__panel overlay--left">
                        <button class="btn" id="signIn" @click="onSignInBtn()">登录</button>
                    </div>
                    <div class="overlay__panel overlay--right">
                        <button class="btn" id="signUp" @click="onSignUpBtn()">注册</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import router from '@/router';
import { ref, defineComponent, reactive, onMounted, nextTick } from 'vue';
import { ElMessage } from 'element-plus'
import SIdentify from "@/components/SIdentify.vue";

// import axios from "axios"
import HTTP from '../utils/https.js'
import { fi } from 'element-plus/es/locale';
interface newUser {
    user: string,
    pasd: string
}

interface newType {
    cla: string,
    user: string,
    pasd: string,
    newList: newUser[],
    nowUser: string,
    LoUser: string,
    LoPasd: string,
    data: any,
    identifyCode: string,
    identifyCodes: string,
    code: string,
}

export default defineComponent({
    components: {
        SIdentify
    },

    setup() {
        const state: newType = reactive({
            cla: 'container',
            user: '',
            //登录账号框内容
            pasd: '',
            //登录密码框内容
            newList: [],
            nowUser: '',
            //当前登录用户名
            LoUser: '',
            //注册账号框内容
            LoPasd: '',
            //注册密码框内容
            data: [],
            identifyCode: "",
            //验证码
            identifyCodes: "0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ",
            code: '',
        })

        const onSignInBtn = () => {
            state.cla = "container"
        }
        const onSignUpBtn = () => {
            state.cla = "container right-panel-active"
            refreshCode()
            console.log(state.identifyCode);

        }


        const onLogin = () => {
        
            HTTP.post("/api/auth/login", { name: state.user, password: state.pasd }).then((resp: any) => {
                // console.log(resp.response.status);
                // console.log(resp.data.statusCode);
                if (resp.data.statusCode === 200) {
                    ElMessage({
                        message: `欢迎您${resp.data.data.name}`,
                        type: 'success',
                    })
                    router.push('/home')
                }
            })

            HTTP.post("/api/auth/login", { name: state.user, password: state.pasd }).then((resp: any) => {
                // console.log(resp.response.status);
                if (resp.response.status === 400) {
                    ElMessage.error('账号或密码错喽，要仔细检查哦')
                }

            })

        }

        const goLogin = () => {

            HTTP.post("/api/user/register", { name: state.LoUser, password: state.LoPasd, confirm: state.LoPasd }).then((resp: any) => {
                // console.log(resp.response.status)
                // console.log(resp.status)


                if (state.code === state.identifyCode) {
                    if (resp.status === 201) {
                        ElMessage({
                            message: `欢迎您加入我们，请登录开始愉快的一天吧`,
                            type: 'success',
                        })
                        onSignInBtn()
                        state.LoUser=''
                        state.LoPasd=''
                        state.code=''
                    } else {
                        ElMessage.error('用户已经存在喽，换个用户名试试吧')

                    }
                } else {
                    ElMessage.error('验证码错喽，要仔细呦')
                }




            })
        }
        const refreshCode = () => {
            state.identifyCode = "";
            makeCode(state.identifyCodes, 4);
            console.log(state.identifyCode);
            
            
        }

        const randomNum = (min: any, max: any) => {
            max = max + 1
            return Math.floor(Math.random() * (max - min) + min)
        }
        // 随机生成验证码字符串
        const makeCode = (data: any, len: any) => {
            for (let i = 0; i < len; i++) {
                state.identifyCode += data[randomNum(0, data.length - 1)]
            }
        }
        return {
            onSignInBtn,
            onSignUpBtn,
            state,
            onLogin,
            goLogin,
            randomNum,
            makeCode,
            refreshCode

        }
    }
})


</script>


<style>
* {
    margin: 0;
    padding: 0;
}

:root {
    --white: #e9e9e9;
    --gray: #333;
    --blue: #0367a6;
    --lightblue: #008997;
    --button-radius: 0.7rem;
    --max-width: 758px;
    --max-height: 420px;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.box {
    /* width: 100vw; */
    height: 100vh;
    background: url("../img/moon.jpg");
    /* https://res.cloudinary.com/dbhnlktrv/image/upload/v1599997626/background_oeuhe7.jpg */
    /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    place-items: center;
}

body {
    align-items: center;
    background-color: var(--white);
}

.form__title {
    font-weight: 300;
    margin: 0;
    margin-bottom: 1.25rem;
}

.link {
    color: var(--gray);
    font-size: 0.9rem;
    margin: 1.5rem 0;
    text-decoration: none;
}

.container {
    background-color: var(--white);
    border-radius: var(--button-radius);
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: var(--max-height);
    max-width: var(--max-width);
    overflow: hidden;
    position: relative;
    width: 100%;
}

.container__form {
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
}

.container--signin {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .container--signin {
    transform: translateX(100%);
}

.container--signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
}

.container.right-panel-active .container--signup {
    animation: show 0.6s;
    opacity: 1;
    transform: translateX(100%);
    z-index: 5;
}

.container__overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
}

.container.right-panel-active .container__overlay {
    transform: translateX(-100%);
}

.overlay {
    background-color: var(--lightblue);
    background: url("../img/moon.jpg");
    /* https://res.cloudinary.com/dbhnlktrv/image/upload/v1599997626/background_oeuhe7.jpg */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 200%;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay__panel {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 50%;
}

.overlay--left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
    transform: translateX(0);
}

.overlay--right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay--right {
    transform: translateX(20%);
}

.btn {
    background-color: var(--blue);
    background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
    border-radius: 20px;
    border: 1px solid var(--blue);
    color: var(--white);
    /* cursor: pointer; */
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.form>.btn {
    margin-top: 1.5rem;
}

.btn:active {
    transform: scale(0.95);
}

.btn:focus {
    outline: none;
}

.form {
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;
}

.input {
    background-color: #fff;
    border: none;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
    width: 100%;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}
</style>

