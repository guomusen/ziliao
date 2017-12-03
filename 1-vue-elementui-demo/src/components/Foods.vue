<template>
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/foods' }">菜品管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜品信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mf">
        <router-link :to="{name:'FoodsEditor'}">
            <el-button type="danger">新增</el-button>
        </router-link>
    </div>
    <div class="mf">
        <!-- :data="typesData" 表格展示的数据 -->
         <el-table
            :data="foodsData"
            border
            stripe
            style="width: 100%">
            <el-table-column
            label="序号"
            width="80"
            type="index">
            </el-table-column>
            <!-- prop="name" 表格列显示数据的字段名 -->
            <el-table-column
            label="图片"
            width="80"
            prop="img">
             <template slot-scope="scope">
                <img class="img" :src="'http://localhost:3000'+scope.row.img" alt="">
            </template>
            </el-table-column>
            <el-table-column
            label="名称"
            width="80"
            prop="name">
            </el-table-column>
            <!-- :formatter="formatterType" 格式化内容 -->
            <el-table-column
            label="分类"
            width="100"
            prop="type"
            :formatter="formatterType">
            </el-table-column>
            <el-table-column
            label="描述"
            prop="description">
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="mf">
        <!-- current-page 当前页 -->
        <!-- current-change 页码改变事件 -->
        <!-- page-count 总页数 -->
        <el-pagination
            layout="prev, pager, next"
            :current-page="pageIndex"
            @current-change="pageChange"
            :page-count="pageCount || 1">
        </el-pagination>
    </div>
    <el-dialog
        title="请确认删除信息"
        :visible.sync="dialogVisible"
        width="30%">
        <span>{{dialogMsg}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doDel">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style>
.el-breadcrumb{
        font-size: 16px;
        margin: 20px 15px;
    }
.mf {
  margin-left: 15px;
}
.img{
    width: 60px;
    height: 60px;
}
</style>

<script>
    import ApiFoodType from '../services/api_food_type'
    import ApiFood from '../services/api_food'
    export default {
        data() {
            return {
                foodsData:[],//表格需要显示的数据
                pageIndex:1,//当前页码
                pageCount:0, //总页数
                dialogVisible:false,//表示对话框是否显示
                dialogMsg:'',//对话框显示的文本
                temDelType:{},// 用于临时记录删除的对象
                allTypes:[] //所有的类型
            }
        },
        methods:{
            // 获取所有的类型
            getAllTypes:function(){
                ApiFoodType.getAllTypes(function(res){
                    this.allTypes = res.data
                }.bind(this))
            },
            // 获取列表数据
            getData:function(){
                ApiFood.getData(this.pageIndex,function(res){
                    // 根据请求返回的数据，设置总页数
                    this.pageCount = res.data.pageCount
                    // 设置列表数据
                    this.foodsData = res.data.res
                }.bind(this))
            },
            // 页码改变时调用该函数，参数为当前页
            pageChange:function(currentPage){
                // 更新当前页
                this.pageIndex = currentPage
                // 重置列表数据
                this.getData()
            },
            // 点击编辑按钮
            handleEdit:function(index,row){
                console.log(index)
                console.log(row)
                // 跳转到编辑页面
                this.$router.push({name:'FoodsEditor',params:{id:row._id}})
            },
            // 点击删除按钮
            handleDelete:function(index,row){
                this.dialogVisible = true//显示对话框
                this.dialogMsg = `确认删除:${row.name}?`
                this.temDelType = row //记录需要删除的对象
            },
            doDel:function(){
                this.dialogVisible = false//隐藏对话框
                // 删除
                ApiFood.deleteById(this.temDelType._id,function(res){
                    if (res.status == 'y') {
                        // 删除成功
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'success'
                        });
                        // 刷新页面
                        // 添加一个随机数作为查询字符串来使路由改变
                        // 监听路由，当路由改变时，重新获取数据
                        // query 查询字符串 ?后面的
                        this.$router.push({name:'Foods',query:{random:Math.random()}})
                    }else{
                        // 删除失败
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }.bind(this))
            },
            // 格式化类型
            formatterType:function(row,column,cellValue){
                return this.allTypes.find((item)=>{
                    return item._id == cellValue
                }).name
            }
        },
        // 生命周期
        created:function(){
            this.getAllTypes()
            // data 创建之后，加载数据
            this.getData()
        },
        // 监听路由
        watch:{
            // 当路由改变时，重新获取数据
            $route:function(){
                this.getAllTypes()
                this.getData()
            }
        }
    }
</script>
