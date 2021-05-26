// grab buttons with the following ids
const returnHomeBtn = document.querySelector("#return-home-btn");
const taskForm = document.querySelector("#save-changes-btn")
// grab values for following ids
// const listName = document.querySelector('input[name="checklist-name"]').value;
// const taskName1 = document.querySelector('input[name="task-input1"]').value;
// const taskName2 = document.querySelector('input[name="task-input2"]').value;
// const taskName3 = document.querySelector('input[name="task-input3"]').value;

// route home function
function routeHome() {
    // redirect to homepage
    document.location.replace('/');
};

// add checklist function
async function addChecklist(event) {
    event.preventDefault();
    
    // testing event listener
    console.log('task changes clicked');

    // add post logic here

    
    
    // if (!taskName1) {
    //     taskName1 = '';
    // }
    
    // if (!taskName2) {
    //     taskname2 = '';
    // }

    // if (!taskName3) {
    //     taskname3 = '';
    // }

    // const checklist_name = listName;

    // const checklist = await fetch('/api/checklists', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         checklist_name
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    // if (taskName1 || taskName2 || taskName3) {
    //     addTaskHandler();
    // }
    // else {
    //     if (checklist.ok) {
    //         document.location.replace('/');
    //     }
    //     else {
    //         alert(response.statusText);
    //     }
    // }
};

// async 

// event listeners
taskForm.addEventListener('click', addChecklist);
returnHomeBtn.addEventListener('click', routeHome);