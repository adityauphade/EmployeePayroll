var number = document.getElementById("number")
var pwd = document.getElementById("pwd")
var smallNumTag = number.parentElement.querySelector("small");
var smallPwdTag = pwd.parentElement.querySelector("small");

const error = "boxContent error";
const success = "boxContent success";
const resetClassname = "boxContent";
var valPwdBool = false;
var valNumberBool = false;

document.getElementById("submitButton").addEventListener('click', function(){
    event.preventDefault();
    validate();
})

function validate(){
    valNumber(number)
    valPwd(pwd)
    let varBool = valNumberBool*valPwdBool;
    if(varBool){
        console.log(varBool);
        localStorage.setItem('loginKey', 'true')
        window.location.href = "./Home.html"
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

window.onload = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
    var redirectURL = (params.redirect);
    console.log(redirectURL);
    if(localStorage.getItem('loginKey')){
        window.location.href = redirectURL;
    }
}