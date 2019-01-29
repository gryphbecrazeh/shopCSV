let addButton = document.getElementById("add");
function addCart(){
    addButton.innerHTML="Added";

}
addButton.addEventListener("click",addCart);
chrome.runtime.onMessage.addListener()