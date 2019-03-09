const todofield = document.getElementsByClassName('todo-input')[0];
const todoListWindow = document.querySelector('.todoList');
var todos = document.querySelector('.list-group');
var Cookies;
var Sortable;
document.addEventListener('DOMContentLoaded', function(){
retriveTodos();
updateClose();
});
// Creates the todo node
function windowCreator(message){
 if (event.keyCode == 13) {
var windowDiv = document.createElement('div');
todoListWindow.insertAdjacentHTML('beforeend', '<div class="window mac list-group-item"><div class="title-bar" id="light">  <div class="close" id="listItem"></div><div class="minimize"></div><div class="zoom"></div></div><div class="page"><p class="message" id="light">'+message+'</p></div></div>');
todofield.value = null;
updateClose();
setCookies();
Sortable.create(todoListWindow, { /* options */ });
}
  else{null}
 };
 // Retrives Cookies
 function retriveTodos(){
   let todos = document.querySelector('.list-group');
  // let todosToAdd = Cookies.getJSON('todos').toString().replace('{','').replace('}', '');
      if (Cookies.get('theme').toString() == 'light'){
    document.querySelector("link.theme").setAttribute("href", "style.css");
    }
    else {
      document.querySelector("link.theme").setAttribute("href", "style-dark.css");
    }
  if (todosToAdd === undefined){
     return null
   }
   else{
  // todos.insertAdjacentHTML('beforeend', todosToAdd);
   updateClose();
   var json = html2json(document.querySelector('.list-group').innerHTML);
    console.log('👉', json);
    const user = netlifyIdentity.currentUser();
    update(user.id);
   }
 };
 // Sets cookies for todos
 function setCookies(){
   if (Cookies.get('cookiebar') == "CookieAllowed"){
   let todos = document.querySelector('.list-group');
  Cookies.set('todos', '{'+ todos.innerHTML +'}',  { expires: 3650000 });
   }
   else{
   return null;
   }
 };

// Updates the EventListner so it's added to the dynamically loaded Elements.
function updateClose(){
var close = document.querySelectorAll('#listItem');
for (var i = 0; i < close.length; i++) {
    close[i].addEventListener("click", function(){
      let parent = this.parentNode.parentNode;
      parent.remove();
         setCookies();
  });
}
};

// Theme selector
document.querySelector('.sun').addEventListener('click', () => {
var href = document.querySelector("link.theme").getAttribute("href");
if (href == "style-dark.css"){
  document.querySelector("link.theme").setAttribute("href", "style.css")
    if (Cookies.get('cookiebar') == "CookieAllowed"){
 Cookies.set('theme', 'light',  { expires: 36500000 });
}
}
else {
  document.querySelector("link.theme").setAttribute("href", "style-dark.css")
    if (Cookies.get('cookiebar') == "CookieAllowed"){
Cookies.set('theme', 'dark',  { expires: 3650000 });
}
}
});


// Get todos via db
const user = netlifyIdentity.currentUser();

// Bind to events
netlifyIdentity.on('init', user => console.log('init', user, "IDK"));
netlifyIdentity.on('login', user => console.log('login', checkIfUserExist(user.id), get(user.id)));
netlifyIdentity.on('logout', () => console.log('Logged out'));
netlifyIdentity.on('error', err => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed'));

var get = function(userId){settings = {
    "url": "https://todo-a4247d.appdrag.site/api/getTodo",
    "data": {
        "userId" : userId,
        "APIKey" : "296c2d24-168e-4105-97bb-e6668d4273b2",
        "AD_PageNbr" : "1",
        "AD_PageSize" : "500"
    },
    "method": "GET",
    "async": true,
    "crossDomain": true,
    "processData": true
};
$.ajax(settings).done(function (response) {
    console.log(response);
    if(response.Table.length == 0){
        return null
    }
    else if (response.Table.length != 0){
   var todos = response.Table[0].todoData.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
    todos = todos.replace(/[\u0000-\u0019]+/g,"");
    json2html(todos);
    console.log(json2html(JSON.parse(todos)));
    var jsonHTML = json2html(JSON.parse(todos));
    document.querySelector('.list-group').insertAdjacentHTML('beforeend', jsonHTML);
    updateClose();
    }
  });
};
var checkIfUserExist = function(userId){settings = {
    "url": "https://todo-a4247d.appdrag.site/api/checkExistingUser",
    "data": {
        "userId" : userId,
        "APIKey" : "296c2d24-168e-4105-97bb-e6668d4273b2",
        "AD_PageNbr" : "1",
        "AD_PageSize" : "500"
    },
    "method": "GET",
    "async": true,
    "crossDomain": true,
    "processData": true
};
$.ajax(settings).done(function (response) {
if (response.Table[0] != userId){
    userAdd(userId);
}
else if (response.Table[0].id == userId){
    return null;
}
});
};
  var userAdd = function(userId, todos){settings = {
    "url": "https://todo-a4247d.appdrag.site/api/userAdd",
    "data": {
        "userId" : userId,
        "todoData" : todos,
        "APIKey" : "296c2d24-168e-4105-97bb-e6668d4273b2"
    },
    "method": "POST",
    "async": true,
    "crossDomain": true,
    "processData": true
};
$.ajax(settings).done(function (response) {
    console.log(response);
    });
  };
  var todos = document.querySelector('.list-group').innerHTML;
  var update = function(userId){settings = {
    "url": "https://todo-a4247d.appdrag.site/api/todoUpdate",
    "data": {
      "userId": userId,
      "todoData": JSON.stringify(html2json(document.querySelector('.list-group').innerHTML)),
      "APIKey": "296c2d24-168e-4105-97bb-e6668d4273b2"
    },
    "method": "PUT",
    "async": true,
    "crossDomain": true,
    "processData": true
};
$.ajax(settings).done(function (response) {
    console.log(response);
    });
  };