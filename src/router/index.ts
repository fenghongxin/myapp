/*
 * @Author: fenghongxin 160813791@qq.com
 * @Date: 2023-02-23 15:03:03
 * @LastEditors: fenghongxin 160813791@qq.com
 * @LastEditTime: 2023-02-27 10:44:16
 * @FilePath: \login\myapp\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/Login/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import( "../views/Home/index.vue"),
  },
  {
    path: "/discuss",
    name: "discuss",
    component: () =>
      import( "../views/Discuss/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
