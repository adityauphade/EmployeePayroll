
function makeRequest(methodType, url, async = true, data = null) {
    return new Promise((resolve, reject) => {
        // #1 -- initiating the connection
        const xhttp = new XMLHttpRequest();

        //check if the connection is right or not with the help of ready state & status
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status >= 200 && xhttp.status < 300) {
                    resolve(xhttp.responseText);
                } else {
                    reject(new Error("rejected"));
                }

            }
        }

        // #2 -- Opening the connection with server   
        xhttp.open(methodType, url);

        // #3 -- Exchanging data with server
        if (data) {
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(data));
        } else {
            xhttp.send();
        }
    })

}

// baseURL = "http://localhost:3000/employeeDetails";
// delURL = "http://localhost:3000/employeeDetails/10";
// editURL = "http://localhost:3000/employeeDetails/1";

// function getUser(data) {
//     console.log(data);
// }

// function delUser(data) {
//     console.log(data);
// }

// //new object to be added
// var newEmp = {
//     "first_name": "Canaa",
//     "last_name": "Smith",
//     "email": "ann@codingthesmartway.com"
// };
// var newEmp2 = {
//     "first_name": "Bhaya",
//     "last_name": "Smith",
//     "email": "ann@codingthesmartway.com"
// };

// function addUser(data) {
//     console.log(data);
// }
// //get
// document.getElementById("getButton").addEventListener('click', async function () {
//     try{
//         const data = await makeRequest('get', baseURL);
//         console.log(data);
    
//     }
//     catch(err){
//         console.error(err.message)
//     }
// })

// //del
// document.getElementById("delButton").addEventListener('click', async function () {
//     try{
//         const data = makeRequest("delete", delURL);
//         console.log(data);
//     }
//     catch(err){
//         console.error(err.message);
//     }
// })

// //add
// document.getElementById("addButton").addEventListener('click', async function () {
//     makeRequest('post', baseURL, true, newEmp)
//         .then(data => {
//             console.log(data)
//         })
//         .catch(err => {
//             console.error(err.message)
//         })
// })

// //edit
// document.getElementById("editButton").addEventListener('click', async function () {
//     makeRequest('put', editURL, true, newEmp2)
//         .then(data => {
//             console.log(data)
//         })
//         .catch(err => {
//             console.error(err.message)
//         })
// })