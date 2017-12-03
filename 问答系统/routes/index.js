const exp = require('express'),
    fs = require('fs'),
    util = require('../utilities'),
    db = require('../db');

const router = exp.Router()

router.get('/', (req, res) => {
    db.Question
    .find()
    .exec((err, data) => {
        if(err){
            // 
        }else{
            console.log(data);
            var questions = [];
            res.render('index', {
                user: req.cookies.petname,
                questions: data.map(m => {
                    m = m.toObject();
                    m.id = m._id.toString();
                    delete m._id;
                    return m;
                })
            });
        }
    });
});

module.exports = router