const exp = require('express'),
    fs = require('fs'),
    util = require('../../utilities'),
    db = require('../../db');
// express是通过npm安装的模块包，
// 因此不要写../../express
// Node.js会自动向上级、上级的上级的上级查找

// 创建一个router（路由）
const router = exp.Router()

// 在路由中添加请求处理方法
router.get('/user/register', (req, res) => {
    res.render('user/register', {
        title: '注册'
    });
});

// 处理注册一个新用户
router.post('/api/user/register', (req, res) => {
    req.body.ip = req.ip;
    req.body.time = new Date();
    // 向数据库写入注册信息
    db.User(req.body).save(err => {
        if (err) {
            res.json({ code: 'error', message: '注册失败' });
        } else res.json({ code: 'success', message: '注册成功' });
    });
});

module.exports = router