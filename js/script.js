var activeItem={};
let addButton = document.getElementById("add");
let gotoCheckout = document.getElementById("gotoCheckout");
let checkout = document.getElementById("checkout");
chrome.runtime.onMessage.addListener(receiveMessage);
function receiveMessage (message, sender, sendResponse){
    if(message.target=="popup"){
        activeItem=message;
    }
}

addButton.addEventListener("click",addCart);
function addCart(){
    chrome.runtime.sendMessage({target:"background",test:"Test",source:"popup"});
    addButton.innerHTML="Added";
}
gotoCheckout.addEventListener("click",goto_check_out);
function goto_check_out (){
    chrome.tabs.create({url:'../html/background.html'});
}
checkout.addEventListener("click",check_out);
function check_out (){
    alert("Thank you!");
}
