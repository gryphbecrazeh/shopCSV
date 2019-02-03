let checkout = document.getElementById("checkout");
let emptyCart = document.getElementById("empty")
window.cart={};
checkout.addEventListener("click",check_out);
function check_out (){
    const message = {
        target:"background",
        action:"empty cart",
        source:"backgroundScript.js"
    }
    downloadCSV({filename:"cart.csv"});
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
    window.cart =  bg.cart;
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


function convertArrayOfObjectsToCsv(args){
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;
    if(data == null || !data.length){
        return null;
    }
    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';
    keys = Object.keys(data[0]);

    result='';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item){
        ctr=0;
        keys.forEach(function(key){
            if(ctr >0) result+=columnDelimiter;
            
            result+=item[key];
            ctr++;
        });
        result+=lineDelimiter;
    });
    return result;
}

function downloadCSV(args){
    var data, filename, link, url;
    var csv = convertArrayOfObjectsToCsv({
        data:cart
    });
    if(csv==null) return;

    filename = args.filename||'cart.csv';
    data = encodeURI(csv);
    link = document.createElement('a');
    link.setAttribute('href',data);
    link.setAttribute('download',filename);
    // maybe I'm missing a URL permission or something
    // , Uncaught TypeError: Failed to execute 'createObjectURL' on 'URL': No function was found that matched the signature provided.
    url = URL.createObjectURL(link);
    // console.log(link);
    // console.log(link.href);
    // console.log(link.filename);
    chrome.downloads.download({
        url:url,
        // filename:filename,
        saveAs:true,
        body:link.href
    });
}