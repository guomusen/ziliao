<template>
  <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/foods_type' }">菜品管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜品分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="mf">
          <!-- :model="type" 表示表单绑定的数据对象 -->
          <!-- :rules="rules" 表示验证规则 -->
          <el-form :model="type" :rules="rules" ref="mainForm" label-width="100px">
            <!-- prop  表示绑定的数据字段 -->
            <el-form-item label="类型名称" prop="name">
                <!-- 带输入建议的输入框 -->
                <el-autocomplete
                    v-model="type.name"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入类名名称">
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="类型描述" prop="description">
                <el-input type="textarea" v-model="type.description" placeholder="请输入描述信息"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>
<style>
.el-breadcrumb {
  font-size: 16px;
  margin: 20px 15px;
}
.mf {
  margin-left: 15px;
}
</style>
<script>
import ApiFoodsType from "../services/api_food_type";
export default {
  data() {
    return {
      id: "", //表示传递过来的id，如果id存在
      type: {
          name:'',
          description:''
      },
      rules:{
          name:[
              {required:true,message:'类型名称不能为空'},
              {min:2,message:'类型名称最少两个字符'}
          ],
          description:[
              {required:true,message:'描述不能为空'}
          ]
      },
    //   菜品类型的输入建议数组
      foodTypes:[
          {'value':'龙岩小吃'},
          {'value':'沙县小吃'},
          {'value':'粤菜'},
          {'value':'鲁菜'},
          {'value':'川菜'},
          {'value':'闽菜'},
          {'value':'浙菜'}
      ]
    };
  },
  created:function(){
    //   首先判断路由中是否有id
      if (this.$route.params.id) {
        //   如果路由中有id，则赋值给this.id
          this.id = this.$route.params.id
        //   根据id获取到数据，并赋值给this.type
          ApiFoodsType.getDataById(this.id,function(res){
              this.type = res.data
          }.bind(this))
      }
  },
  methods:{
      submitForm:function(){
          this.$refs['mainForm'].validate((valid)=>{
              if (valid) {
                //   验证成功
                if (this.id) {
                    // 更新
                    ApiFoodsType.update(this.id,this.type,function(res){
                        if (res.status == 'y') {
                            // 成功
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'success'
                            });
                            // 保存成功后跳转到FoodsType页面
                            this.$router.push({name:'FoodsType'})
                        }else{
                            // 失败
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }.bind(this))
                }else{
                    // 新建
                    ApiFoodsType.save(this.type,function(res){
                        if (res.status == 'y') {
                            // 成功
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'success'
                            });
                            // 保存成功后跳转到FoodsType页面
                            this.$router.push({name:'FoodsType'})
                        }else{
                            // 失败
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }.bind(this))
                }
              }else{
                //   验证失败
                console.log('validate error')
              }
          })
      },
    //   输入框输入建议查询
      querySearch:function(queryStr,cb){
          if (queryStr) {
            //   如果查询字符串存在
            var result = this.foodTypes.filter(function(item){
                return item.value.toLowerCase().indexOf(queryStr) > -1
            })
            // 把查询结果返回
            cb(result)
          }else{
            //   如果没有查询字符串，则使用回调函数传递foodTypes数组
              cb(this.foodTypes)
          }
      }
  }
};
</script>