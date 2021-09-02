var number = document.getElementById("number")
var pwd = document.getElementById("pwd")
var smallNumTag = number.parentElement.querySelector("small");
var smallPwdTag = pwd.parentElement.querySelector("small");
var alertSmall = document.getElementById("alert"); 
var loginData = {}
var signupRedirect = document.getElementById("signupRedirect")

const error = "boxContent error";
const success = "boxContent success";
const resetClassname = "boxContent";
var valPwdBool = false;
var valNumberBool = false;
const credentialURL = "http://localhost:3000/credentials";

document.getElementById("submitButton").addEventListener('click', function(){
    event.preventDefault();
    validate();
})

function checkCred(){
    var loginCredentialList = [];
    makeRequest('get', credentialURL).then(loginCred => {
        loginCredentialList = JSON.parse(loginCred)
        loginCredentialList.forEach(e => {
            if(e.number == number.value.trim() && e.password == pwd.value.trim()){
                //success
                pwd.parentElement.className = success;
                number.parentElement.className = success;
                localStorage.setItem('loginKey', JSON.stringify(e))
                window.location.href = redirectURL;
                alertSmall.innerText = "User doesn't Exist"
            }
            else{
                // throw "Incorrect Credentials";
                pwd.parentElement.className = error;
                number.parentElement.className = error;
                alertSmall.innerText = "";
                // throw err
            }
        })
    })
}

function validate(){
    valNumber(number)
    valPwd(pwd)
    let varBool = valNumberBool*valPwdBool;
    if(varBool){
        console.log(varBool);
        // localStorage.setItem('loginKey', 'true')
        // window.location.href = redirectURL;
        checkCred();
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

function valPwd(pwd){
    if (pwd.value.trim() === ""){
        pwd.parentElement.className = error;
        smallPwdTag.innerText = "Please Enter Password";
    }
    else{
        const regpwd = /^(?=.*?[!@#$%^_+&*]{1})(?=.*?[A-Z]+)(?=.*?\d+).{8,}$/;
        if(regpwd.test(pwd.value)){
            pwd.parentElement.className = success;
            smallPwdTag.innerText = "";
            valPwdBool = true;
        }
        else{
            pwd.parentElement.className = error;
            smallPwdTag.innerText = "Incorrect Format"
        }
    }
}

var redirectURL;
window.onload = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
    redirectURL = (params.redirect || "./Home.html");
    console.log(redirectURL);
    if(localStorage.getItem('loginKey')){
        window.location.href = redirectURL;
    }
}

// RESET BUTTON
document.getElementById("resetButton").addEventListener('click', function(){
    pwd.parentElement.className = resetClassname;
    number.parentElement.className = resetClassname;
    smallNumTag.innerText = ""
    smallPwdTag.innerText = ""
    alertSmall.innerText = ""

})