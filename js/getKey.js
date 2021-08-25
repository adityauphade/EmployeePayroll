//to generate key
// var finalKey;
numberList = [];
function generateKey(){
    var key = Math.floor((Math.random()*100));
    var a = numberList.find(element => element == key);
    console.log(`initial key: ${key}`)

    if(a != undefined){
        generateKey();
    }
    else{
        numberList.push(key);
        return key;
    }  
}

generateKey();
generateKey();
generateKey();
console.log(numberList);

