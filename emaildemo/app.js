const exp = require("express");
const bodyParser = require("body-parser");
const app = exp();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', require("express-art-template"));
app.set('view engine', 'html');

app.use(exp.static("public"));

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/post", require("./routes/post"));
app.use("/api/v1/comment", require("./routes/comment"));

app.get('/', function (req, res) {
    res.redirect("/views/user/index.html");
})

app.listen(3000, function (req, res) {
    console.log("服务器运行在3000端口....");
})