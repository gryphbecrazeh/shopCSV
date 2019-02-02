document.addEventListener('DOMContentLoaded',function(){
    const bg = chrome.extension.getBackgroundPage();
    Object.keys(bg.x).forEach(function(){
        const div = document.createElement('div');
        div.textContent=`${legnth}`;
        document.getElementById('content').appendChild(div);
        document.getElementById('howManyBears').appendChild(bears);
    });
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