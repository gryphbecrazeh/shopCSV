// let the = /\w*/gmi;
// alert(document.body.innerText.match(the).length);
window.onload=()=>{
    let width = new RegExp('the');
    let body = document.getElementsByTagName("body");
    let element = document.documentElement;
    const csv = {
        height:[],
        width:[],
        length:[],
        depth:[]
    }
    csv.width = element.innerText.match(/(?<=(width)(.)*)\d+\.?\d*/gmi);
    csv.length = element.innerText.match(/(?<=(length)(.)*)\d+\.?\d*/gmi);
    csv.height = element.innerText.match(/(?<=(height)(.)*)\d+\.?\d*/gmi);
    let message = {
        target:"background",
        message:csv,
        source:"content"
    }
    console.log(csv);
    console.log(csv.length);
    chrome.runtime.sendMessage(message);   
}