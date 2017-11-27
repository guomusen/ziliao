const db = require("mongoose");
db.Promise = require("bluebird");
db.connect("mongodb://localhost/post",{
    useMongoClient:true
});

var Schema = db.Schema;

var user_schema = new Schema({
    name:String,
    age:Number,
    posts:[
        {type:Schema.Types.ObjectId,ref:"post"}
    ],
    comments:[
        {type:Schema.Types.ObjectId,ref:"comment"}
    ]
})

var User = db.model('user',user_schema);

var post_schema = new Schema({
    title:String,
    content:String,
    author:{type:Schema.Types.ObjectId,ref:"user"},
    comments:[
        {type:Schema.Types.ObjectId,ref:"comment"}
    ]
})

var Post = db.model('post',post_schema);
var comment_schema = new Schema({
    content:String,
    author:{type:Schema.Types.ObjectId,ref:"user"},
    post:{type:Schema.Types.ObjectId,ref:"post"}
})

var Comment = db.model('comment',comment_schema);

module.exports = {
    User:User,
    Post:Post,
    Comment:Comment
}