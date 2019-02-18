window.viewedObject = {};
window.cart = [];
window.index=0;
function Table(){
    this.obj=window.cart}
Table.prototype.headers= (function(){
    let headers=[];
    for(key in this.obj[0]){
        let i=0;
        headers.push(key);
    }
    return headers;
});
window.table= new Table();

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
   const actions = {view:viewItem,remove:removeItem,append:appendItem,range:request.range||window.cart.length||0,index:request.index||0};
    function viewItem(){
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            let url = tabs[0].url;
            request.message.url = url;
        });
        request.message.delete = `<button class="remove" id="${window.index}">Remove</button>`;
        request.message.id=window.index++;
        window.viewedObject = request.message;
    }
    function removeItem (){
        window.cart.slice(actions.index,actions.range);
        chrome.browserAction.setBadgeText({text:`${window.cart.length}`});
    }
    function appendItem(){
        let alreadyInCart=false;
        for(let i = 0; i<window.cart.length;i++){
            if(window.viewedObject.url==window.cart[i].url){
                alert("Item is already in your cart");
                alreadyInCart=true;
            }
        }
        if(alreadyInCart==false){
            window.cart.push(window.viewedObject);
            chrome.browserAction.setBadgeText({text:`${window.cart.length}`});    
        }
    }
    request.target=="background" ? (
        request.action=="store" ? (actions.view())
        :request.action=="empty cart" ? (actions.remove())
        :request.action=="remove item" ? (actions.remove())
        :request.action=="add" ? (actions.append()):console.log("null"))
        :console.log("null");
});