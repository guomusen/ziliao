const   exp = require('express'),
        fs = require('fs'),
        util = require('../utilities')
        db = require('../db.js')
const router = exp.Router()


router.get('/answer/:id', util.sign, (req, res) => {
    res.render('answer', {
        title: '回答',
        id: req.params.id
    })
})

router.post('/api/answer', util.sign, (req, res) => {
    var petname = req.cookies.petname

    req.body.petname = petname
    req.body.ip = req.ip
    req.body.time = new Date()
    var id = req.body.id
    db.Question.findByIdAndUpdate(id, {$push:{answers:req.body}}, (err, data) => {
        console.log(data)
        util.send(res, 'success', '回答提交成功！')
    })
})


module.exports = router