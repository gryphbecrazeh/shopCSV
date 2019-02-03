const viewedObject = {obj:{}};
window.cart = [];
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.target=="background"&&request.source=="content"){
        viewedObject.obj = request.message;
    }
    else if(request.target=="background"&&request.source=="popup"){
        cart.push(viewedObject.obj);
    }
    else if(request.target=="background"&&request.source=="backgroundScript.js"){
        cart = [];
    }
});
// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.create({url:'../html/background.html'});
// });
