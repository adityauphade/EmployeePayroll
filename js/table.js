
createTable();
function createTable(){
    let employeeObjList = JSON.parse(localStorage.getItem(`EmployeePayrollList`));
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
        table_content =`${table_content}
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
}

// to delete a selected row
function deleteID(node){
    let Payrolllist = JSON.parse(localStorage.getItem(`EmployeePayrollList`));
    let newPayrolllist = [];
    Payrolllist.forEach(emp => {
        if (emp.id != node) {
            newPayrolllist.push(emp)
        }
        localStorage.setItem(`EmployeePayrollList`, JSON.stringify(newPayrolllist))
    })   
    
    let LocalKeyArray = JSON.parse(localStorage.getItem(`keys`));
    try{
        // LocalKeyArray.remove(node);
        let NewLocalKeyArray = LocalKeyArray.filter(k => k!=node)
        localStorage.setItem(`keys`, JSON.stringify(NewLocalKeyArray));
    }
    catch(err){
        console.log(`no key present in Local storage Keys`)
    }
    //make the changes in the local storage
    createTable();
}

//to edit the selected row
function editID(node){
    localStorage.setItem("Editkey", node);
    window.location.href = "./EmployeePayroll.html";
    const id = localStorage.getItem(`key`);
    console.log(id);
    let PayrollObjList = JSON.parse(localStorage.getItem(`EmployeePayrollList`));
    PayrollObjList.forEach(e => {
        if (e.id === node) {
            document.getElementById(`nameId`).value = e.name;
            document.querySelectorAll("input[name=`profiles`]").forEach(n => {
                if (n.value == e.profile) {n.checked = true;}
            });
            document.querySelectorAll("input[name=`gender`]").forEach(n => {
                if(n.value == e.gender){n.checked = true;}
            });
            // console.log(`Hello`)
        }
        else{
            throw `ID NOT FOUND`
        }
    })

}