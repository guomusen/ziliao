const exp = require("express");
var router = exp.Router();
var User = require("../db").User;
var Post = require("../db").Post;
var Comment = require("../db").Comment;

// 首页数据
router.get("/list",function(req,res){
    User.find(function(err,data){
        if (!err) {
            res.json({
                data:data
            })
        }
    })
})

// 添加用户
router.post("/add",function(req,res){
    var user = new User(req.body);
    user.save().then(function(){
        res.redirect("/views/user/index.html");
    })
})

// 删除用户
router.post("/delete/:id",function(req,res){
    User.findByIdAndRemove(req.params.id,function(err,user){
        Post.remove({"_id":{$in:user.posts}}).then(function(){
            Comment.remove({"_id":{$in:user.comments}}).then(function(){
                res.json({
                    code:"success"
                })
            })
        })
    })
})


module.exports = router;