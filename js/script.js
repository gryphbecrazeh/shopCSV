let addButton = document.getElementById("add");
function addCart(){
    let csvRequest = {
        target:"content",
        data:"CSV"
    }
    // This sends out the request to the content script, which will then send back the csv object, this actually works
    chrome.runtime.sendMessage(csvRequest);
    // console.log(csvRequest);
    addButton.innerHTML="Added";

}
addButton.addEventListener("click",addCart);

chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        alert(request.message);
    }
);
