let newdata = {};
var profile = document.getElementsByClassName("ProfileOptions")
var Name = document.getElementById("nameId")
const error = `row-content error`;
const success = `row-content success`;
const reset_name = `row-content`;
const reset_date = `DateInput`;
var validate_bool_name = false;
var validate_bool_date = false;
var validate_bool = false;


// class EmployeePayroll
// let EditKey = localStorage.getItem(`Editkey`);
// if (EditKey == undefined) {
    
// } else {
    
// } 

// validate name
function checkname(ename_tag){
    if(ename_tag.value === ""){
        ename_tag.parentElement.className = error;
    }
    else{
        const name_regex = /^([A-Z])([A-Za-z ]){2,}$/;
        if (name_regex.test(ename_tag.value)) {
            ename_tag.parentElement.className = success;
            console.log(ename_tag.parentElement.className)
            validate_bool_name = true;
        } else {
            ename_tag.parentElement.className = error;
        }
    }
}

// while typing validation
document.getElementById("nameId").onkeyup = function(event){
    checkname(event.target);
}


//validate date
function checkdate(eday_tag, edate){
    const today = new Date();
    console.log(today);
    const givendate = new Date(edate);
    console.log(givendate);
    inBetween_Days = (today-givendate)/(1000*60*60*24);
    console.log(inBetween_Days);
    if (inBetween_Days<31 && inBetween_Days>=0) {
        eday_tag.parentElement.className = `DateInput success`;
        validate_bool_date = true;

    } else {
        eday_tag.parentElement.className = `DateInput error`;
        
    }
}

//onsubmit
document.getElementById("empadd-form").onsubmit = function(event){
    event.preventDefault();
    //tags to get values from html
    ename_tag = event.target.name;
    eprofile_tag = event.target.profiles;
    egender_tag = event.target.gender;
    edept = [];
    edept_tag = [];
    let checkdept = [];
    checkdept = event.target.Department;
    checkdept.forEach(element => {
        if (element.checked) {
            edept_tag.push(element)
            edept.push(element.value)

        }
    });
    esalary_tag = event.target.salary;
    eday = event.target.Day.value;
    emonth = event.target.Month.value;
    eyear = event.target.Year.value;
    edate = `${emonth}/${eday}/${eyear}`;
    eday_tag = event.target.Day;
    enote_tag = event.target.Notes;

    // validate
    validate();
    
    function validate(){
        checkname(ename_tag);
        checkdate(eday_tag, edate);
    }

    //if validateion is true
    validate_bool = validate_bool_date*validate_bool_name;
    if(validate_bool){
        createPayrollObject();
    }
    
    // push object data in local storage
    function createPayrollObject(){
        // push the values in an object called newdata
        newdata = {
            name: ename_tag.value,
            profile: eprofile_tag.value,
            gender: egender_tag.value,
            department: edept,
            salary: esalary_tag.value,
            startdate: edate,
            note: enote_tag.value
        }

        //call Push to local
        pushToLocal();
    }
        
        // push into local storage
    function pushToLocal(){
        let localPayrolllist = JSON.parse(localStorage.getItem(`EmployeePayrollList`));
        // newdata.id = localPayrolllist.length; 
        newdata.id = generateKey(); 
        if(localPayrolllist==undefined){
            localPayrolllist = [newdata];
        }
        else{
            
            localPayrolllist.push(newdata)
        }
        localStorage.setItem(`EmployeePayrollList`, JSON.stringify(localPayrolllist));
        
        //redirect to home page
        validate_bool_date = false;
        validate_bool_name = false;
        validate_bool = false;
        console.log(numberList)

        window.location.href = "./Home.html"
        
    }


}

//reset functionality
document.getElementById("empadd-form").onreset = function(){
    ename_tag.parentElement.className = reset_name;
    eday_tag.parentElement.className = reset_date;
}

//to generate key
numberList = []
function generateKey(){
    var key = Math.floor((Math.random()*1000));
    var a = numberList.find(element => element == key);
    
    if(a != undefined){
        generateKey();
    }
    else{
        numberList.push(key);

        //stores the key in the local storage

        let localKeys = JSON.parse(localStorage.getItem(`keys`));
        if (localKeys == undefined) {
            localKeys = [key];
            console.log(`ksjsjajsk ${typeof localKeys}`);
        }
        else{
            localKeys.push(key);
        }
        localStorage.setItem(`keys`, JSON.stringify(localKeys));
        
        return key;
    }  
}






