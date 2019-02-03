let checkout = document.getElementById("checkout");
let emptyCart = document.getElementById("empty")

checkout.addEventListener("click",check_out);
function check_out (){
    const message = {
        target:"background",
        action:"empty cart",
        source:"backgroundScript.js"
    }
    chrome.runtime.sendMessage(message);
    alert("Thank you!");
    location.reload();
}
emptyCart.addEventListener("click",empty_cart);
function empty_cart (){
    const message = {
        target:"background",
        action:"empty cart",
        source:"backgroundScript.js"
    }
    chrome.runtime.sendMessage(message);
    alert("Cart Emptied!");
    location.reload();
}


document.addEventListener('DOMContentLoaded',function(){
    const bg = chrome.extension.getBackgroundPage();
    let headers = [];
    for(let j=0;j<Object.keys(bg.cart[0]).length;j++){
        headers.push(Object.keys(bg.cart[0])[j]);
    }
    const div = document.createElement('div');
    for(let k = 0;k<headers.length;k++){
        div.textContent+=` ${headers[k]}`;
    }
    document.getElementById('content').appendChild(div);
    for(let i=0;i<bg.cart.length;i++){
        const div = document.createElement('div');
        div.textContent=`${bg.cart[i].width}, ${bg.cart[i].length}, ${bg.cart[i].height}, ${bg.cart[i].depth}`;
        document.getElementById('content').appendChild(div);
        };    
    }, false);


// document.addEventListener('DOMContentLoaded',function(){
//     const bg = chrome.extension.getBackgroundPage();
//     Object.keys(bg.bears).forEach(function(url){
//         const div = document.createElement('div');
//         const bears= document.createElement('i');
//         bears.className="fas fa-paw";
//         (()=>{
//             if(bg.count>0){
//                 div.textContent=`${url}: ${bg.bears[url]}`
//             }
//             else{
//                 div.textContent="You are safe";
//             }
//         })();
//         document.getElementById('content').appendChild(div);
//         document.getElementById('howManyBears').appendChild(bears);
//     });
// }, false);