var x={};
let addButton = document.getElementById("add");
chrome.runtime.onMessage.addListener(receiveMessage);
function receiveMessage (message, sender, sendResponse){
    // in order for this to work, you must have already had the extension inspected for
    //  it to count it, the popup needs to be open when you refresh the page, this currently
    //  only works when you have the popup html inspected as it forces the popup to stay open, 
    // need to set up a script to send request from script.js to content.js
    // window.x might still work as a global variable, I"m not certain as I jad just relized this
    // old method for receiving messages from popup script might have worked
    // it appears I forgot to semi-colon a line, which mighthave been the cause of receiving messages not working
    x=message;
    console.log(x);
}
console.log(x);
addButton.addEventListener("click",addCart);
function addCart(){
    addButton.innerHTML="Added";
}