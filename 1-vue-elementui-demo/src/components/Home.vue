<template>
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>计时</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-left:15px">
        <el-button type="primary" :loading="isLoading" @click="counter">{{btnName}}</el-button>
        <h3>当前计时为:{{seconds}}</h3>
    </div>
  </div>
</template>
<style>
    .el-breadcrumb{
        font-size: 16px;
        margin: 20px 15px;
    }
</style>
<script>
    export default {
        data() {
            return {
                btnName:'开始计时',
                seconds:0,
                isLoading:false
            }
        },
        methods:{
            counter:function(){
                // 如果当前为正在计时状态，则点击按钮无效
                if (this.isLoading) {
                    return
                }
                this.seconds = 0 //开始计时，seconds重置为0
                this.btnName = '计时中...'//改变按钮标题
                this.isLoading = true//设置加载效果
                var timer = setInterval(function(){
                    this.seconds += 1//计数器增加1
                    if (this.seconds == 5) {
                        // 当计时器的值为5时，结束计时
                        clearInterval(timer)//关闭计时器
                        this.isLoading = false//关闭加载效果
                        this.btnName = '计时完成'//设置按钮标题
                    }
                }.bind(this),1000)
            }
        }
    }
</script>