$('form').submit(function (e) {
    e.preventDefault();

    var question = $.cookie('question');
    var formData = $(this).serializeArray();
    // 把获取到的cookie值和回答问题的内容拼接到一起，然后发送给服务器
    formData.push({
        name: "question",
        value: question
    })
    $.post(this.action, formData, (data) => {
        if (data.code == "success") {
            location.href = '/';
        }
    })
})