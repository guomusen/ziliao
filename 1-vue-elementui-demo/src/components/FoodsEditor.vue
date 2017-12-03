<template>
  <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/foods_type' }">菜品管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜品信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="mf">
          <!-- :model="type" 表示表单绑定的数据对象 -->
          <!-- :rules="rules" 表示验证规则 -->
          <el-form :model="food" :rules="rules" ref="myForm" label-width="100px">
            <!-- prop  表示绑定的数据字段 -->
            <el-form-item label="类型名称" prop="name">
                <el-input v-model="food.name" placeholder="请输入菜品名称"></el-input>
            </el-form-item>
            <el-form-item label="分类名称" prop="type">
               <el-select v-model="food.type" placeholder="请选择类型">
                    <el-option
                    v-for="item in allTypes"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model.number="food.price" placeholder="请输入菜品价格"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="img">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:3000/common/file/uploadfile"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="food.img" :src="'http://localhost:3000'+food.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="类型描述" prop="description">
                <el-input type="textarea" v-model="food.description" placeholder="请输入描述信息"></el-input>
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<script>
import ApiFoodsType from "../services/api_food_type";
import ApiFoods from "../services/api_food";
export default {
  data() {
    var checkPrice = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("价格不能为空"));
      }
      if (isNaN(value)) {
        callback(new Error("价格必须为数字"));
      }
      if (value < 0 || value > 200) {
        callback(new Error("价格应在0~200之间"));
      }
      callback()
    };
    return {
      id: "", //表示传递过来的id，如果id存在
      food: {
        name: "",
        description: "",
        type: "",
        img: "",
        price: 0
      },
      allTypes: [], //所有分类
      rules: {
        name: [
          { required: true, message: "类型名称不能为空" },
          { min: 2, message: "类型名称最少两个字符" }
        ],
        type:[{required:true,message:'分类不能为空'}],
        price: [{validator:checkPrice}],
        description: [{ required: true, message: "描述不能为空" }]
      }
    };
  },
  created: function() {
    this.getAllTypes();
    //   首先判断路由中是否有id
    if (this.$route.params.id) {
      //   如果路由中有id，则赋值给this.id
      this.id = this.$route.params.id;
      //   根据id获取到数据，并赋值给this.type
      ApiFoods.getDataById(
        this.id,
        function(res) {
          this.food = res.data;
        }.bind(this)
      );
    }
  },
  methods: {
    getAllTypes: function() {
      ApiFoodsType.getAllTypes(
        function(res) {
          this.allTypes = res.data;
        }.bind(this)
      );
    },
    submitForm: function() {
      this.$refs['myForm'].validate((valid) => {
        if (valid) {
          //   验证成功
          if (this.id) {
            // 更新
            ApiFoods.update(
              this.id,
              this.food,
              function(res) {
                if (res.status == "y") {
                  // 成功
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "success"
                  });
                  // 保存成功后跳转到Foods页面
                  this.$router.push({ name: "Foods" });
                } else {
                  // 失败
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "error"
                  });
                }
              }.bind(this)
            );
          } else {
            // 新建
            ApiFoods.save(
              this.food,
              function(res) {
                if (res.status == "y") {
                  // 成功
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "success"
                  });
                  // 保存成功后跳转到FoodsType页面
                  this.$router.push({ name: "Foods" });
                } else {
                  // 失败
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "error"
                  });
                }
              }.bind(this)
            );
          }
        } else {
          //   验证失败
          console.log("validate error");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
    //   this.food.img = URL.createObjectURL(file.raw);
      this.food.img = res.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>