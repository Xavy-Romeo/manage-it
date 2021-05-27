// grab buttons with the following ids
const returnHomeBtn = document.querySelector("#return-home-btn");
const taskForm = document.querySelector("#save-changes-btn");

// declaring global variabless
let listId = '';
let checklistOk = false;

// route home function
function routeHome() {
    // redirect to homepage
    document.location.replace('/');
};

// add checklist function
async function addChecklist(event) {
    // prevent refresh
    event.preventDefault();

    // grab values for following ids
    const checklistName = document.querySelector('input[name="checklist-name"]').value;
    const taskName1 = document.querySelector('input[id="task-input1"]');
    const taskName2 = document.querySelector('input[id="task-input2"]');
    const taskName3 = document.querySelector('input[id="task-input3"]');
    
    // store values in taskValues array
    const taskValues = [taskName1, taskName2, taskName3];

    // declaring variable
    let statusText = '';

    // add checklist to database via post request
    const checklist = await fetch('/api/checklists', {
        method: 'POST',
        body: JSON.stringify({
            checklist_name: checklistName
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // set checklistOk to true
            checklistOk = true;
        }
        else {
            // set status text if post request not successful
            statusText = response.statusText;
        }
        // return response in json format
        return response.json();
    })
    .then(response => {
        // store value of new checklist id 
        listId = response.id; 
    })
    .catch(err => {
        console.log(err);
    });

    // if checklist post request successful
    if (checklistOk) {
        // if task values are not all left null
        if (taskName1.value !== '' || taskName2.value !== '' || taskName3.value !== '') {
            // call addTaskHandle function and pass in taskValues array
            addTaskHandler(listId, taskValues);
        }
        else {
            // redirect to homepage
            document.location.replace('/');
        }
    }
    // if checklist post request unsucessful
    else {
        // send alert
        alert(`Checklist: ${checklist_name} ` + statusText);
    }
};

// addTaskHandler function takes in task array
async function addTaskHandler(listId, taskValues) {
    // check value of task 1
    if (taskValues[0].value !== '') {
        // add task to checklist via post request
        const task1 = await fetch('api/tasks', {
            method: 'POST',
            body: JSON.stringify({
                // use id of newly created checklist
                checklist_id: listId,
                name: taskValues[0].value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // check if other tasks are null
        if (taskValues[1].value === '' && taskValues[2].value === '') {
            // check if post request successful
            if (task1.ok) {
                // redirect to homepage
                document.location.replace('/');
            }
            // if post request unsuccessful
            else {
                // send alert
                alert(`Task1: ${taskValues[0].value}, ` + response.statusText);
            }
        }
    }

    // check value of task2
    if (taskValues[1].value !== '') {
        // add task to checklist via post request
        const task2 = await fetch('api/tasks', {
            method: 'POST',
            body: JSON.stringify({
                checklist_id: listId,
                name: taskValues[1].value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (taskValues[2].value === '') {
            if (task2.ok) {
                document.location.replace('/');
            }
            else {
                alert(`Task2: ${taskValues[1].value}`, response.statusText);
            }
        }
    }

    // check value of task 3
    if (taskValues[2].value !== '') {
        // add task to checklist via post request
        const task3 = await fetch('api/tasks', {
            method: 'POST',
            body: JSON.stringify({
                checklist_id: listId,
                name: taskValues[2].value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (task3.ok) {
            document.location.replace('/');
        }
        else {
            alert(`Task3: ${taskValues[2].value}`, response.statusText);
        }
    }
}; 

// event listeners
taskForm.addEventListener('click', addChecklist);
returnHomeBtn.addEventListener('click', routeHome);