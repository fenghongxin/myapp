/*
 * @Author: fenghongxin 160813791@qq.com
 * @Date: 2023-02-23 15:03:03
 * @LastEditors: fenghongxin 160813791@qq.com
 * @LastEditTime: 2023-02-24 16:17:07
 * @FilePath: \login\myapp\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require("@vue/cli-service");
const list = [
  {
    user: 'admin',
    pasd: "123456",
  },
  {
    user: "devin",
    pasd: "123456"
  }
]

const bodyParser = require('body-parser')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
 
  
  }
});
