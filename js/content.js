let width = new RegExp('the');
let body = document.getElementsByTagName("body");
let addButton = document.getElementById("add");
let the = /\w*/gmi;
alert(document.body.innerText.match(the).length);