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
   let todosToAdd = Cookies.getJSON('todos').toString().replace('{','').replace('}', '');
      if (Cookies.get('theme').toString() == 'light'){
    document.querySelector("link.theme").setAttribute("href", "style.css");
    }
    else {
      document.querySelector("link.theme").setAttribute("href", "style-dark.css");
    }
   if (todosToAdd == "[object Object]"){
     return null
   }
   else{
   todos.insertAdjacentHTML('beforeend', todosToAdd);
   updateClose();
   var json = html2json(document.querySelector('.list-group').innerHTML);
    console.log('👉', json);
    const user = netlifyIdentity.currentUser();
    update(user.id);
    apikey = "296c2d24-168e-4105-97bb-e6668d4273b2";
    var data = {
        "userId" : user.id,
        "todoData" : json,
        "APIkey" : apikey
    }
    userAdd(`https://todo-a4247d.appdrag.site/api/userAdd`, data);
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
netlifyIdentity.on('login', user => console.log('login', get(user.id)));
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
   /* json2html(response.Table[0].todoData);
    console.log(json2html(response.Table[0].todoData));
    var jsonHTML = json2html(response.Table[0].todoData);
    console.log(json2html(response.Table[0].todoData));*/
    document.querySelector('.list-group').insertAdjacentHTML('beforeend', response.Table[0].todoData);
    updateClose();
  });
};
var userAdd = function(url = ``, data) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
    .then(response => console.log(response))
    .then(response => console.log(response, JSON.stringify(data)));
}
  /*var userAdd = function(userId){settings = {
    "url": "https://todo-a4247d.appdrag.site/api/userAdd",
    "data": {
        "userId" : userId,
        "todoData" : todos.innerHTML,
        "APIKey" : "b6c0a7d9-0566-44c1-a754-6c0f883bb2b5"
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
  */
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