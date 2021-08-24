
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
                    <img src="/assets/Logo/edit.png" alt="Edit"> 
                </td>
            </tr>
        </tbody>`
    });

    console.log(table_content);
    document.getElementById(`payroll-table`).innerHTML = table_content;
}