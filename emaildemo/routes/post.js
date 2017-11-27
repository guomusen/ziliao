const exp = require("express");
var router = exp.Router();
var User = require("../db").User;
var Post = require("../db").Post;
var Comment = require("../db").Comment;

// 首页数据
router.get("/list", function (req, res) {
    Post.find().populate('author').then(function (data) {
        res.json({
            data: data
        })
    })
})
// 添加邮件
router.post("/add",function(req,res){
    var post = new Post(req.body);
    User.findById(req.body.author).then(function(user){
        return Promise.all([post.save(),user]);
    }).spread(function(post,user){
        user.posts.push(post);
        return Promise.all([user.save()]);
    }).spread(function(){
        res.redirect("/views/post/index.html");
    })
})
// 删除邮件
router.post("/delete/:id",function(req,res){
    Post.findByIdAndRemove(req.params.id,function(err,post){
        User.findById(post.author).then(function(user){
            for (var i = 0; i < user.posts.length; i++) {
                if (user.posts[i].toString() == post._id.toString()) {
                    user.posts.splice(i, 1);
                }
            }
            return Promise.all([user.save()])
        }).then(function(){
            res.json({
                code:"success"
            })
        })
    })
})


module.exports = router;