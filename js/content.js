let width = new RegExp('the');
let body = document.getElementsByTagName("body");
let addButton = document.getElementById("add");
// let the = /\w*/gmi;
// alert(document.body.innerText.match(the).length);



// Test message, using target as popup for logic, in the future I will be sending the collective objects to the background page, and it's target will not be the pop-up's js
let message = {
    target:"popup",
    message:"test"
}
// Sends a message, will later send the object containing all of the fields for the csv
chrome.tabs.sendmessage(tab.id, message);