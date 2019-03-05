function Todo(userId) {
  this.userId = netlifyIdentity.currentUser().id;
};

Todo.prototype.getTodos = function() {
    var settings = {
    "url": "https://todo-a4247d.appdrag.site/api/getTodo",
    "data": {
        "userId" : userId,
        "APIKey" : "b6c0a7d9-0566-44c1-a754-6c0f883bb2b5",
        "AD_PageNbr" : "1",
        "AD_PageSize" : "500"
    },
    "method": "GET",
    "async": true,
    "crossDomain": true,
    "processData": true
};
$.ajax(settings).done(function (response) {
    console.log(response); // TODO: Do something with the result
});
  return `${response.table}`;
};