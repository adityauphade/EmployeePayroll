
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

        employeeObjList.forEach(obj => {
            table_content = `${table_content}
            <tbody>
                <tr>
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
                </tr>
            </tbody>`
        });
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