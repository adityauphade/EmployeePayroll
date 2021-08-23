
let employeeObjList = JSON.parse(localStorage.getItem(`EmployeePayrollList`));
document.getElementById(`count`).innerText = employeeObjList.length;
createTable();
function createTable(){
    let table_header = `<thead>
        <tr>
            <th></th>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Actions</th>
        </tr>
    </thead>`

    let table_content = `${table_header}`;

    employeeObjList.forEach(obj => {
        table_content =`${table_content}
        <tbody>
            <tr>
                <td class="e-profile">
                    <img src="../assets/Profiles/Ellipse -2.png" alt="User Profile">
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
                    Rs. 10,000
                </td>
                <td class="e-start-date">
                    29 Oct 2019
                </td>
                <td class="payroll-table-actions">
                    <img src="/assets/Logo/delete.jpg" alt="Delete">
                    <img src="/assets/Logo/edit.png" alt="Edit"> 
                </td>
            </tr>
        </tbody>`
    });

    console.log(table_content);
    document.getElementById(`payroll-table`).innerHTML = table_content;
}