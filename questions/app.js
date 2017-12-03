const exp = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = exp();

// 使用body-parser和cookie-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

// 注册的路由
app.use(require('./routers/user/register'));
// 登录的路由
app.use(require('./routers/user/sign'));
// 上传头像的路由
app.use(require('./routers/user/photo'));
// 提问问题的路由
app.use(require('./routers/ask'));
// 回答问题的路由
app.use(require('./routers/answer'));
// 获取首页数据
app.use(require('./routers/index'));


// 设置静态文件，在路由之后设置是因为需要判断是否登录，即匹配静态路由
app.use(exp.static('wwwroot'));

app.listen(3000, () => {
    console.log("服务器运行在3000端口...");
})