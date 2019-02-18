let checkout = document.getElementById("checkout");
let emptyCart = document.getElementById("empty");
window.deleteItem = [];

checkout.addEventListener("click",check_out);
function check_out (){
    const message = {
        target:"background",
        action:"empty cart",
        source:"backgroundScript.js"
    }
    // designates the file name to the cart object
    downloadCSV({filename:"cart.csv"});
    // sends message to the background script to empty the cart
    chrome.runtime.sendMessage(message);
    alert("Thank you!");
    location.reload();
}

deleteItem.addEventListener("click",remove_item(deleteItem.id));
function remove_item (id){
    const message = {
        target:"background",
        action:"remove item",
        index:id,
        source:"backgroundScript.js"
    }
    chrome.runtime.sendMessage(message);
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
    location.reload();
}
document.addEventListener('DOMContentLoaded',(()=>{
    let elementTable = document.getElementById("cartTable");
    const bg = chrome.extension.getBackgroundPage();
    let headerRow = elementTable.insertRow(0);
    headerRow.cell={};
    for(key in bg.table.headers()){
        activeKey=bg.table.headers()[key];
        if(activeKey!="id"&&activeKey!="url"){
            headerRow.cell[key]=headerRow.insertCell(key);
            headerRow.cell[key].innerHTML=`${activeKey}`;
        }
    }
    for(let i=0;i<bg.table.obj.length;i++){
        let row = elementTable.insertRow(i+1);
        row.cell={};
        for(key in bg.table.headers()){
            activeKey=bg.table.headers()[key];
            activeObject=bg.table.obj;
            if(activeKey!="id"&&activeKey!="url"){
                row.cell[key]=row.insertCell(key);
                if(activeKey!="delete"){
                    row.cell[key].innerHTML=`<input type="text" placeholder="${activeObject[i][activeKey]}">`;
                }
                else{
                    row.cell[key].innerHTML=`${activeObject[i][activeKey]}`;
                    // pushes the html object to an array, which will be referenced in the onclick event which will plug in the index of the item to be removed
                    window.deleteItem.push(document.getElementById(`remove${activeObject[i].id}`));
                }
            }
        }
    }
})());





























function convertArrayOfObjectsToCsv(args){
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    // alternative values to use when exporting csv
    data = args.data || null;
    if(data == null || !data.length){
        return null;
    }
    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';
    // defines the object headers, can probable pull from the existing header array from above
    keys = Object.keys(data[0]);

    result='';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item){
        ctr=0;
        keys.forEach(function(key){
            // inserts a comma after each item
            if(ctr >0) result+=columnDelimiter;            
            result+=item[key];
            ctr++;
        });
        result+=lineDelimiter;
    });
    return result;
}

function downloadCSV(args){
    var filename, url;
    var csv = convertArrayOfObjectsToCsv({
        data:cart
    });
    if(csv==null) return;

    filename = args.filename||'cart.csv';
    let blob = new Blob([csv],{type:'text/csv;charset=utf-8;'});
    url = URL.createObjectURL(blob);
    chrome.downloads.download({
        url:url,
        filename:filename,
        saveAs:true
    });
}