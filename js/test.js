const object = {name:"Chris",age:26,class:["programmer","graphic artist","character designer","tattoo artist"]};

function Headers(arguments){
    for(key in arguments){
        this[key] = key;
    };
}

let headers = new Headers(object);
headers;