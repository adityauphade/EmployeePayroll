var number = document.getElementById("number")
var pwd = document.getElementById("pwd")
var pwd2 = document.getElementById("pwd2")
var email = document.getElementById("email")
var smallNumTag = number.parentElement.querySelector("small");
var smallPwdTag = pwd.parentElement.querySelector("small");
var smallPwd2Tag = pwd2.parentElement.querySelector("small");
var smallEmailTag = email.parentElement.querySelector("small");
const credentialURL = "http://localhost:3000/credentials";
var newCred = {};
var credEmpList = []
var alertTag = document.getElementById("alert")

const error = "boxContent error";
const success = "boxContent success";
const resetClassname = "boxContent";
var valPwdBool = false;
var valNumberBool = false;
var valEmailBool = false;

document.getElementById("submitButton").addEventListener('click', function(event){
    event.preventDefault();
    validate();
})

function createObj(){
    newCred = {
        email: email.value,
        number: number.value,
        password: pwd.value,
    }
    console.log(newCred)
    checkUniqueCred(newCred);
}

async function checkUniqueCred(newCred){
    try{
        credEmpList = JSON.parse(await makeRequest('get', credentialURL));
        credEmpList = credEmpList.filter(e => e.number == newCred.number)
        if (credEmpList.length == 0) {
            pushCred(newCred)
            alertTag.innerText = "";
        }
        else{
            email.parentElement.className = error;
            number.parentElement.className = error;
            pwd2.parentElement.className = error;
            pwd.parentElement.className = error;
            alertTag.innerText = "User already exists";
        }
    }
    catch(err){
        console.error(err);
    }

}

async function pushCred(newCred){
    try{
        await makeRequest('post', credentialURL, true, newCred)
    }
    catch(err){
        console.error(err)
    }
    finally{
        console.log("Bhaya")
        window.location.href = "./Login.html";
    }
}

function validate(){
    valNumber(number)
    valEmail(email)
    valPwd(pwd, pwd2)
    let varBool = valEmailBool*valNumberBool*valPwdBool;
    if(varBool){
        createObj();
        console.log(varBool);
    }
};

function valNumber(number){
    if (number.value.trim() === ""){
        number.parentElement.className = error;
        smallNumTag.innerText = "Please Enter Number"
    }
    else{
        const regNumber = /^([0-9]{2}[6-9][0-9]{9})$/;
        if(regNumber.test(number.value)){
            number.parentElement.className = success;
            smallNumTag.innerText = ""
            valNumberBool = true;
        }
        else{
            number.parentElement.className = error;
            smallNumTag.innerText = "Incorrect Format"
        }
    }
}

function valEmail(email){
    if (email.value.trim() === ""){
        email.parentElement.className = error;
        smallEmailTag.innerText = "Please Enter Email"
    }
    else{
        const regEmail = /^([a-zA-Z]+[.][a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-z]+([.a-z]+)$)$/;
        if(regEmail.test(email.value)){
            email.parentElement.className = success;
            smallEmailTag.innerText = ""
            valEmailBool = true;
        }
        else{
            email.parentElement.className = error;
            smallEmailTag.innerText = "Incorrect Format"
        }
    }
}
function valPwd(pwd, pwd2){
    if (pwd.value.trim() === ""){
        pwd.parentElement.className = error;
        pwd2.parentElement.className = error;
        smallPwdTag.innerText = "Please Enter Password";
        smallPwd2Tag.innerText = "Please Enter Password";
    }
    else{
        const regpwd = /^(?=.*?[!@#$%^_+&*]{1})(?=.*?[A-Z]+)(?=.*?\d+).{8,}$/;
        if(regpwd.test(pwd.value)){
            if (pwd.value == pwd2.value) {
                pwd.parentElement.className = success;
                smallPwdTag.innerText = "";
                pwd2.parentElement.className = success;
                smallPwd2Tag.innerText = "";
                valPwdBool = true;
                
            } else {
                pwd.parentElement.className = success;
                smallPwdTag.innerText = "";
                pwd2.parentElement.className = error;
                smallPwd2Tag.innerText = "The passwords don't match";
            }
        }
        else{
            pwd.parentElement.className = error;
            smallPwdTag.innerText = "Incorrect Format"
            pwd2.parentElement.className = error;
            smallPwd2Tag.innerText = "Incorrect Format"
        }
    }
}

window.onload = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
    var redirectURL = (params.redirect);
    console.log(redirectURL);
    if(localStorage.getItem('loginKey')){
        window.location.href = redirectURL;
    }
}

// RESET BUTTON
document.getElementById("resetButton").addEventListener('click', function(){
    pwd.parentElement.className = resetClassname;
    number.parentElement.className = resetClassname;
    pwd2.parentElement.className = resetClassname;
    email.parentElement.className = resetClassname;
    smallNumTag.innerText = ""
    smallPwdTag.innerText = ""
    smallPwd2Tag.innerText = ""
    smallEmailTag.innerText = ""

})