const exp = require('express'),
    fs = require('fs'),
    common = require('../common');
const route = exp.Router();

// 如果直接是浏览器访问，则重定向到登录页面，如果不是，则加载静态文件
route.get('/answer.html', common.isSign, (req, res, next) => {
    next();
})

route.post('/api/user/answer', common.isSign, (req, res) => {
    var fileName = `questions/${req.body.question}.json`;
    req.body.time = new Date();
    req.body.ip = req.ip;
    req.body.petname = req.cookies.petname;
    var content = JSON.stringify(req.body);
    content = content.replace('/</g',"&lt;");
    content = content.replace('/>/g',"&gt;");
    var answer = JSON.parse(content);
    fs.readFile(fileName,(err,data)=>{
        if (err) {
            common.send(res,'file error',"回答问题失败！");
        }else{
            // 把读出的数据转换成问题对象
            var question = JSON.parse(data.toString());
            // 如果该问题没有被回答过，则answers属性应该是一个空数组
            if (!question.answers) {
                question.answers = [];
            }
            // 把请求数据，即回答的内容添加到问题的answers数组中
            question.answers.push(answer);
            fs.writeFile(fileName,JSON.stringify(question),(err)=>{
                if (err) {
                    common.send(res,"answer error","回答问题失败！");
                } else {
                    common.send(res,"success","回答问题成功！");
                }
            })
        }
    })
})

module.exports = route;