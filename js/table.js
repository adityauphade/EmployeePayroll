var blockRow = "rowContent hide"
var showRow = "rowContent"
var EmpFilterList;
var count = 0;
var baseURL = "http://localhost:3000/EmployeePayrollList";
createTable();
function createTable() {
    // let employeeObjList = JSON.parse(localStorage.getItem(`EmployeePayrollList`));
    let employeeObjList = [];
    makeRequest('get', baseURL, true).then(data => {
        employeeObjList = JSON.parse(data);
        console.log(employeeObjList);
        document.getElementById(`count`).innerText = employeeObjList.length;
        let table_header = `<thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Comment</th>
                <th>Actions</th>
            </tr>
        </thead>`

        let table_content = `${table_header}`;

        table_content += "<tbody class='tableBody'>"
        employeeObjList.forEach(obj => {
            table_content = `${table_content}
                <tr id="mytr-${obj.id}" class="rowContent">
                    <td class="e-profile">
                        <img src="${obj.profile}" alt="User Profile">
                    </td>
                    <td class="e-name">
                        ${obj.name}
                    </td>
                    <td class="e-gender">
                        ${obj.gender}
                    </td>
                    <td class="e-department">
                        ${obj.department}
                    </td>
                    <td class="e-salary">
                        $ ${obj.salary}
                    </td>
                    <td class="e-start-date">
                        ${obj.startdate}
                    </td>
                    <td>
                        ${obj.note}
                    </td>
                    <td class="payroll-table-actions">
                        <img onclick ="deleteID(${obj.id})" src="/assets/Logo/delete.jpg" alt="Delete">
                        <img onclick ="editID(${obj.id})" src="/assets/Logo/edit.png" alt="Edit"> 
                    </td>
                </tr>`
            });
            table_content += "</tbody>"
        document.getElementById(`payroll-table`).innerHTML = table_content;
    });
}

// to delete a selected row
async function deleteID(node) {
    try{
        await makeRequest('delete', `${baseURL}/${node}`, true);
    }
    catch(err){console.error(err)}
    //make the changes in the local storage
    finally{
        createTable();
    }
}

//to edit the selected row
function editID(node) {
    // localStorage.setItem("Editkey", node);
    window.location.href = `./EmployeePayroll.html?id=${node}`;
}

window.onload = function(){
    if(!localStorage.getItem('loginKey')){
        window.location.href = `./Login.html?redirect=${encodeURI(window.location.href)}`
    }
}


//SEARCH BAR
document.getElementById("searchBar").addEventListener('input', (event) => findData(event.target.value))

makeRequest('get', baseURL, true).then(data => {
    EmpFilterList = JSON.parse(data);
    console.log(EmpFilterList)
});


function findData(searchItem){
    console.log(searchItem)
    EmpFilterList.forEach(emp => {

        if(emp.name.toLowerCase().includes(searchItem.toLowerCase())){
            document.getElementById(`mytr-${emp.id}`).className = showRow;
        }else{
            document.getElementById(`mytr-${emp.id}`).className = blockRow;
        }
    })
}

//logout
document.getElementById("logout").onclick = () => {
    localStorage.removeItem("loginKey");
    window.location.href = "./Login.html"
}

//SEARCH BUTTON (FADE IN/OUT)
$(document).ready(function(){
    $(".buttons button").click(function(){
        $(".buttons input").animate({opacity: 'toggle', width: 'toggle',  padding: 'toggle'}, 160, "swing");
        // $(".buttons input").animate({opacity: 'toggle', boxshadow: 'toggle', left: '0px', padding: 'toggle'}, 200, "swing");
    });
});