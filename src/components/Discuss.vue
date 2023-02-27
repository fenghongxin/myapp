<!--
 * @Author: fenghongxin 160813791@qq.com
 * @Date: 2023-02-27 18:50:27
 * @LastEditors: fenghongxin 160813791@qq.com
 * @LastEditTime: 2023-02-27 19:41:59
 * @FilePath: \login\myapp\src\components\Discuss.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="discuss" v-loading="state.loading">
        <div class="discuss-top">
            <div>称呼: <input type="text" placeholder="请输入称呼"></div>
            <div>Email: <input type="text" placeholder="请输入联系方式    "></div>
            <div>状态: <select name="" id="sel" v-model="state.sel">
                    <option value="">已通过</option>
                    <option value="">未通过</option>
                </select>
            </div>
            <div class="dbtn">
                <el-button type="primary" :icon="Search">搜索</el-button>
                <el-button type="primary" :icon="Search" color='white'>重置</el-button>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { Loading } from 'element-plus/es/components/loading/src/service';
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import { defineComponent, reactive, onMounted, ref } from 'vue'
const loading: any = ref(true)
interface stateType {
    loading: boolean,
    sel: string
}
export default defineComponent({
    setup() {
        const state: stateType = reactive({
            loading: false,
            sel: ''
        })

        return {
            state
        }
    }
})
</script>

<style lang="scss">
.discuss {
    width: 100%;
    height: 100%;
    background-color: #eff2f5;

    .discuss-top {
        width: 96%;
        height: 125px;
        background-color: white;
        margin-left: 2%;
        display: flex;


        div {
            margin-left: 40px;
            margin-top: 25px;

            input {
                width: 290px;
                height: 30px;
                border: 1px solid #d9d9d9;
                text-indent: 1em;
            }

            select {
                width: 180px;
                height: 30px;
                border: 1px solid #d9d9d9;
            }
        }


        .dbtn {
            width: 150px;
            height: 60px;
            margin-left: 20%;
            margin-top: 60px;

          
        }
    }


}</style>