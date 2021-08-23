let newdata = {};
var profile = document.getElementsByClassName("ProfileOptions")
var Name = document.getElementById("nameId")
const error = `row-content error`;
const success = `row-content success`;


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
        } else {
            ename_tag.parentElement.className = error;
        }
    }
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
    } else {
        eday_tag.parentElement.className = `DateInput error`;
        
    }
}


// while typing validation
document.getElementById("nameId").onkeyup = function(event){
    checkname(event.target);
}


// while adding date validate
// document.getElementById(`DateInput`).onkeyup = function(event){
//     console.
//     checkdate(event.target, )
// }


document.getElementById("empadd-form").onsubmit = function(event){
    event.preventDefault();
    //tags to get values from html
    const ename_tag = event.target.name;
    const eprofile_tag = event.target.profiles;
    const egender_tag = event.target.gender;
    const edept = [];
    const edept_tag = [];
    let checkdept = [];
    checkdept = event.target.Department;
    checkdept.forEach(element => {
        if (element.checked) {
            edept_tag.push(element)
            edept.push(element.value)

        }
    });
   
    const esalary_tag = event.target.salary;

    const eday = event.target.Day.value;
    const emonth = event.target.Month.value;
    const eyear = event.target.Year.value;
    const edate = `${emonth}/${eday}/${eyear}`;
    const eday_tag = event.target.Day;
    const enote_tag = event.target.Notes;

    // push the values in an object called newdata
    newdata = {
        name: ename_tag.value,
        profile: eprofile_tag.value,
        gender: egender_tag.value,
        department: edept,
        salary: esalary_tag.value,
        startdate: edate,
        note: enote_tag.value
    };
    
    validate();

    function validate(){
        checkname(ename_tag);
        checkdate(eday_tag, edate);
    }

    function checkname(ename_tag){
        if(ename_tag.value === ""){
            ename_tag.parentElement.className = error;
        }
        else{
            const name_regex = /^([A-Z])([A-Za-z ]){2,}$/;
            if (name_regex.test(ename_tag.value)) {
                ename_tag.parentElement.className = success;
                console.log(ename_tag.parentElement.className)
            } else {
                ename_tag.parentElement.className = error;
            }
        }
    }

    function checkdate(eday_tag, edate){
        const today = new Date();
        console.log(today);
        const givendate = new Date(edate);
        console.log(givendate);
        inBetween_Days = (today-givendate)/(1000*60*60*24);
        console.log(inBetween_Days);
        if (inBetween_Days<31 && inBetween_Days>=0) {
            eday_tag.parentElement.className = `DateInput success`;
        } else {
            eday_tag.parentElement.className = `DateInput error`;
            
        }
    }
  
}
