const exp = require("express");
var router = exp.Router();
var User = require("../db").User;
var Post = require("../db").Post;
var Comment = require("../db").Comment;

// 首页数据
router.get("/list", function (req, res) {
    Comment.find().populate('author post').then(function (data) {
        res.json({
            data: data
        })
    })
})

// 添加回复
router.post("/add", function (req, res) {
    var comment = new Comment(req.body);

    User.findById(req.body.author, function (err, user) {
        Post.findById(req.body.post).then(function (post) {
            return Promise.all([comment.save(), post, user]);
        }).spread(function (comment, post, user) {
            user.comments.push(comment);
            post.comments.push(comment);
            return Promise.all([user.save(), post.save()]);
        }).spread(function () {
            res.redirect("/views/comment/index.html");
        })
    })
})

// 删除回复
router.post('/delete/:id', function (req, res) {
    Comment.findByIdAndRemove(req.params.id, function (err, comment) {
        Post.findById(comment.post).then(function (post) {
            for (var i = 0; i < post.comments.length; i++) {
                if (post.comments[i].toString() == comment._id.toString()) {
                    post.comments.splice(i, 1);
                }
            }
            return Promise.all([post.save()]);
        }).then(function () {
            User.findById(comment.author).then(function (user) {
                for (var i = 0; i < user.comments.length; i++) {
                    if (user.comments[i].toString() == comment._id.toString()) {
                        user.comments.splice(i, 1);
                    }
                }
                return Promise.all([user.save()])
            }).then(function () {
                res.json({
                    code: "success"
                })
            })
        })
    })
})

module.exports = router;