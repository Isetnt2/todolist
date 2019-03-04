const todofield = document.getElementsByClassName('todo-input')[0];
const todoListWindow = document.querySelector('.todoList');
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
    ("link.theme").setAttribute("href", "style.css");
    }
    else {
      ("link.theme").setAttribute("href", "style-dark.css");
    }
   if (todosToAdd == "[object Object]"){
     return null
   }
   else{
   todos.insertAdjacentHTML('beforeend', todosToAdd);
   updateClose();
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
function logIn(){
var loginOpen = netlifyIdentity.open();
var logout = netlifyIdentity.logout();
var loginButton = document.querySelector('.login-button');
const user = netlifyIdentity.currentUser();
loginButton.addEventListener('click', netlifyIdentity.open());
loginButton.addEventListener('click', loginOpen);
netlifyIdentity.on('init', function init(){console.log('init', user); });
netlifyIdentity.on('login', function logout(){
    console.log('login', user);
    loginButton.innerHTML='<span>Logout</span>';
});

netlifyIdentity.on('logout', function login(){
    console.log('Logged out');
    logoutButton.innerHTML='<span>Login</span>';
    logoutButton.id = login;
});
netlifyIdentity.on('error', err => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed'));
};
login();
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
