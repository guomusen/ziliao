const exp = require('express'),
    fs = require('fs'),
    util = require('../utilities'),
    db = require('../db');

const router = exp.Router()

router.get('/ask', util.sign, (req, res) => {
    res.render('ask', {
        title: '提问'
    })
})

// 处理提问的接口
router.post('/api/ask', util.sign, (req, res) => {
    var petname = req.cookies.petname;
    var time = new Date();

    req.body.petname = petname;
    req.body.ip = req.ip;
    req.body.time = time;

    db.Question(req.body).save(err => {
        if(err){
            util.send(res, 'file error', '抱歉，系统错误...');
        }else util.send(res, 'success', '问题提交成功！');
    });
});

module.exports = router