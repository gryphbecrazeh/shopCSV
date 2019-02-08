window.onload=()=>{
    let element = document.documentElement;
    const csv = {};
    csv.width = element.innerText.match(/(?<=(width)(.)*)\d+\.?\d*/gmi);
    csv.length = element.innerText.match(/(?<=(length)(.)*)\d+\.?\d*/gmi);
    csv.height = element.innerText.match(/(?<=(height)(.)*)\d+\.?\d*/gmi);
    csv.depth = element.innerText.match(/(?<=(depth)(.)*)\d+\.?\d*/gmi);
    let message = {
        target:"background",
        message:csv,
        action:"store",
        source:"content"
    }
    chrome.runtime.sendMessage(message);   
}