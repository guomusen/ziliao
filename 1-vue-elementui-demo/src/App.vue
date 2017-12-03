<template>
  <div id="app">
    <!-- 导航 -->
    <el-row>
      <el-col :span="24">
        <el-header>
          <img src="./assets/logo-war3.png" alt="">
          <h3>点菜后台管理系统</h3>
        </el-header>
      </el-col>
    </el-row>
    <el-row style="height:100%">
      <!-- 左侧导航 -->
      <el-col :span="4" style="height:100%">
        <!--
          el-menu 使用路由步骤
          1. :router="true" 开启路由功能，使el-menu可以使用路由功能 
          2. :route="{name:'Home'}" 在el-menu-item中设置路由路径，传递一个对象
        -->
         <el-menu
          default-active="1"
          background-color="#6699ff"
          text-color="white"
          active-text-color="#ffd04b"
          style="height:100%"
          :router="true">
          <el-menu-item index="1" :route="{name:'Home'}">
             <template slot="title">
              <i class="el-icon-location"></i>
              首页
             </template>
          </el-menu-item>
          <el-submenu index="100">
            <template slot="title">
              <i class="el-icon-menu"></i>
              菜品管理
            </template>
             <el-menu-item-group>
              <el-menu-item index="2" :route="{name:'FoodsType'}">菜品分类管理</el-menu-item>
              <el-menu-item index="3" :route="{name:'Foods'}">菜品信息管理</el-menu-item>
             </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
            订单管理
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <!-- 右侧区域 -->
      <el-col :span="20" style="height:100%;">
        <!-- 显示匹配路由加载的组件 -->
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.el-header {
  height: 60px;
  padding-left: 50px;
  display: flex;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 6px;
  box-sizing: border-box;
  background-color: #6699ff;
}
.el-header img {
  height: 48px;
  width: auto;
  margin-right: 18px;
}
</style>
