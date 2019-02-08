window.viewedObject = {};
window.cart = [];

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
   const actions = {view:viewItem,remove:removeItem,append:appendItem,range:request.range||window.cart.length||0,index:request.index||0};
    function viewItem(){
        window.viewedObject = request.message;
    }
    function removeItem (){
        window.cart.slice(actions.index,actions.range);
        chrome.browserAction.setBadgeText({text:`${window.cart.length}`});
    }
    function appendItem(){
        window.cart.push(window.viewedObject);
        chrome.browserAction.setBadgeText({text:`${window.cart.length}`});
    }
    request.target=="background" ? (
        request.action=="store" ? (actions.view())
        :request.action=="empty cart" ? (actions.remove())
        :request.action=="remove item" ? (actions.remove())
        :request.action=="add" ? (actions.append()):console.log("null"))
        :console.log("null");
});