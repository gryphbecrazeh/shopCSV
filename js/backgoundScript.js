let checkout = document.getElementById("checkout");
let emptyCart = document.getElementById("empty")



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
    // re-initializes the cart variable??
    window.cart =  bg.cart;
    if(window.cart.length>0){
        // create headers
        for(let j=0;j<Object.keys(window.cart[0]).length;j++){
            headers.push(Object.keys(bg.cart[0])[j]);
        }
        // begin render cart
        const div = document.createElement('div');
        // render headers
        // maybe switch for forEach
        for(let k = 0;k<headers.length;k++){
            div.textContent+=` ${headers[k]}`;
        }
        // append headers
        document.getElementById('content').appendChild(div);
        // begin render item values
        for(let i=0;i<bg.cart.length;i++){
            const div = document.createElement('div');
            const deleteButton = document.createElement('button');
            // generates a unique productID, also allows functionality to remove specific elements
            div.id=`product${i}`;
            deleteButton.className="deleteButton";
            deleteButton.id=`deleteButton${i}`;

            // lists out all of the elements of the object
            // render all of the elements of the object
            let itemContent = ``;
            for(let k=0;k<headers.length;k++){
                console.log(headers[k]);
                console.log(bg.cart[i]);
                let itemHeader = headers[k];
                console.log(itemHeader);
                let itemArray = bg.cart[i];
                itemContent+=`${itemArray[itemHeader]}, `;
            }
            div.textContent=itemContent;
            // div.textContent=`${bg.cart[i].width}, ${bg.cart[i].length}, ${bg.cart[i].height}, ${bg.cart[i].depth}`;
            // creates remove from cart button
            deleteButton.textContent="Remove from Cart";
            // creates event listener for item at it's array index
            deleteButton.addEventListener("click",function(){
                deleteItem(i);
            },false);
            function deleteItem (arrayIndex){
                // Removes item from cart
                cart.splice(arrayIndex,1);
                const message = {
                    target:"background",
                    action:"remove item",
                    index:arrayIndex,
                    range:1,
                    source:"backgroundScript.js"
                }
                // tells the background script to remove this specific item from the background cart
                chrome.runtime.sendMessage(message);
                // refreshes the background page to show latest update to cart
                location.reload();
            }            
            // Creates renders the objects, later to be replaced with html tables
            document.getElementById('content').appendChild(div);
            document.getElementById(div.id).appendChild(deleteButton);
            };
    }
}, false);

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