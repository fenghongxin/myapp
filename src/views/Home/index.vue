<template>
  <div class="span">
    <div class="left">
      <div v-if="state.flag">
        <h3>添加标签</h3>
        <input type="text" placeholder="  添加标签名称" class="input1" v-model="inputValue">
        <input type="text" placeholder="  添加标签值(请输入英文，作为路由使用)">
        <p><button>保存</button></p>
      </div>
      <div v-else>
        <h3>管理标签</h3>
        <input type="text" :placeholder="state.newJie.label">
        <input type="text" :placeholder="state.newJie.value">
        <p class="p">
          <b><button>更新</button><button @click="state.flag = true">返回添加</button></b>

          <button>删除</button>
        </p>
      </div>
    </div>
    <div class="right">
      <h3>所有标签</h3>
      <ul>
        <li @click="handleclick(item.id)" v-for="(item, index) in state.fenlei" :key="index">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import axios from 'axios'
const inputValue = ref('')
interface fenleiType {
  articleCount: number,
  createAt: string,
  id: string | number,
  label: string,
  updateAt: string
  value: string
}

interface stateType{
  fenlei:fenleiType[],
  newJie:fenleiType[],
  flag:boolean
}



export default defineComponent({
  setup() {
    const state: any = reactive({
      fenlei: [],
      newJie: [],
      flag: true
    })

    const handleclick = (id: number) => {
      state.newJie = state.fenlei.find((v: fenleiType) => v.id === id)
      state.flag = false
    }
    onMounted(() => {
      axios.get("https://creationadmin.shbwyz.com/api/tag").then(res => {
        state.fenlei = res.data.data
        console.log(state.fenlei);

      })
    })
    return {
      state,
      inputValue,
      handleclick
    }
  }
})
</script>

<style lang="scss">
.span {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  background-color: #eee;

  .left {
    width: 40%;
    height: 50%;
    background-color: #fff;

    h3 {
      font-weight: bolder;
      height: 50px;
      align-items: center;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      padding-left: 5%;
    }

    p {
      padding-left: 5%;

      button {
        padding: 6px 15px;
        background-color: rgb(70, 70, 243);
        color: #fff;
        border: none;
        margin-top: 15px;

      }
    }

    .p {
      display: flex;
      justify-content: space-between;
      padding-right: 5%;

      b {
        button:nth-child(2) {
          background-color: #fff;
          color: #000;
          border: 1px dashed #999;
        }
      }

      button:nth-child(2) {
        background-color: #fff;
        color: red;
        border: 1px solid red;
      }
    }

    input {
      width: 90%;
      margin: 10px 5%;
      height: 40px;
      border: 1px solid #999;
    }
  }

  .right {
    width: 50%;
    height: 20%;
    background-color: #fff;

    h3 {
      font-weight: bolder;
      height: 50px;
      align-items: center;
      line-height: 50px;
      border-bottom: 1px solid #eee;
      padding-left: 5%;
    }

    ul {
      li {
        display: inline-block;
        padding: 4px 15px;
        border: 1px solid #999;
        margin: 5px;
      }
    }
  }
}
</style>