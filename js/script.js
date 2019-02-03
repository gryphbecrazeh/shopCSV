let addButton = document.getElementById("add");
let gotoCheckout = document.getElementById("gotoCheckout");
chrome.runtime.onMessage.addListener(receiveMessage);
function receiveMessage (request, sender, sendResponse){
    if(request.target=="popup"){
        console.log(request);
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
