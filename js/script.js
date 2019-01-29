function addCart(){
    addButton.innerHTML="Added";

}
addButton.addEventListener("click",addCart);

chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        alert(request.message);
    }
);