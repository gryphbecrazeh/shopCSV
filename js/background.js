const x = {message:{}};
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.target=="background"&&request.source=="content"){
        x.message = request.message;
    }
    else if(request.target=="background"&&request.source=="popup"){
        let message = {
            target:"popup",
            message:x.message,
            source:"background"
        }
        chrome.runtime.sendMessage(message);
    }
});
// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.create({url:'../html/background.html'});
// });
