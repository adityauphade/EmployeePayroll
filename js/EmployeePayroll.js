var newdata = {};
var profile = document.getElementsByClassName("ProfileOptions")
var Name = document.getElementById("nameId")
const error = `row-content error`;
const success = `row-content success`;
const reset_name = `row-content`;
const reset_date = `DateInput`;
var validate_bool_name = false;
var validate_bool_date = false;
var validate_bool = false;

const baseURL = "http://localhost:3000/EmployeePayrollList";

let params;

//edit
window.onload = async function () {
    if(!localStorage.getItem('loginKey')){
        window.location.href = `./Login.html?redirect=${encodeURI(window.location.href)}`
    }

    // check if this is the edit page when the page loads
    const urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
    if (params.id != undefined) {
        try{
            let e = JSON.parse(await makeRequest('get', `${baseURL}/${params.id}`));

            //name
            document.getElementById(`nameId`).value = e.name;
            //profiles
            document.querySelectorAll("input[name='profiles']").forEach(n => {
                if (n.value == e.profile) { n.checked = true; }
            });
            //gender
            document.querySelectorAll("input[name='gender']").forEach(n => {
                if (n.value == e.gender) { n.checked = true; }
            });
            //department
            document.querySelectorAll("input[name='Department']").forEach(d => {
                if (e.department.indexOf(d.value) != -1) { d.checked = true; }
            });
            //salary
            document.getElementById("Range").value = e.salary;
            document.getElementById("salary_value").innerHTML = e.salary;
            //date
            document.getElementById("Month").value = e.startdate.split('/')[0];
            document.getElementById("Day").value = e.startdate.split('/')[1];
            document.getElementById("Year").value = e.startdate.split('/')[2];
            //notes
            document.getElementById("Notes").value = e.note;
        }
        catch(err){
            console.log(err);
        }
    }
}


// validate name
function checkname(ename_tag) {
    if (ename_tag.value === "") {
        ename_tag.parentElement.className = error;
    }
    else {
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

// while typing name validation
document.getElementById("nameId").onkeyup = function (event) {
    checkname(event.target);
}


//validate date
function checkdate(eday_tag, edate) {
    const today = new Date();
    console.log(today);
    const givendate = new Date(edate);
    console.log(givendate);
    inBetween_Days = (today - givendate) / (1000 * 60 * 60 * 24);
    console.log(inBetween_Days);
    if (inBetween_Days < 31 && inBetween_Days >= 0) {
        eday_tag.parentElement.className = `DateInput success`;
        validate_bool_date = true;

    } else {
        eday_tag.parentElement.className = `DateInput error`;

    }
}

//onsubmit
document.getElementById("empadd-form").onsubmit = function (event) {
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

    function validate() {
        checkname(ename_tag);
        checkdate(eday_tag, edate);
    }

    //if validateion is true
    validate_bool = validate_bool_date * validate_bool_name;
    if (validate_bool) {
        createPayrollObject();
    }

    // push the values in an object called newdata
    function createPayrollObject() {
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
        pushToJSON(newdata);
    }

    //push to JSON server
    async function pushToJSON(newdata){
        try{
            if (!params.id) {
                makeRequest('post', baseURL, true, newdata)
            } else {
                makeRequest('put', `${baseURL}/${params.id}`, true, newdata)

            }
        }

        catch(err){
            console.error(err);
        }

        finally{
            validate_bool_date = false;
            validate_bool_name = false;
            validate_bool = false;
    
            window.location.href = "./Home.html"
        }

    }


}

//reset button functionality
document.getElementById("empadd-form").onreset = function () {
    document.getElementById(`nameId`).parentElement.className = reset_name;
    document.getElementsByClassName("DateInput").className = reset_date;
}

//cancel button
document.getElementById("cancelButton").onclick = function (){
    window.location.href = "./Home.html"
}

//logout
document.getElementById("logout").onclick = () => {
    localStorage.removeItem("loginKey");
    window.location.href = "./Login.html"
}