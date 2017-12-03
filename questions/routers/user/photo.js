const exp = require('express'),
    fs = require('fs'),
    multer = require('../../multer'),
    common = require('../../common');
const route = exp.Router();

// 浏览器直接访问user/photo.html时，判断是否登录，如果没有登录，则重定向到登录页面
route.get('/user/photo.html',common.isSign,(req,res,next)=>{
    next();
})

route.post('/api/user/photo', common.isSign ,multer.single('photo'), (req, res) => {
    common.send(res, "success", "上传头像成功");
})

module.exports = route;