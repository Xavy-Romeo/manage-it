const nameUser = document.querySelector('.user-name').textContent.trim();
const taskContainerEl = document.querySelector('.task-container');
const taskItemEl = document.querySelector('task-item');
const listGroup = document.querySelector('.list-group');

// declaring global variables
let id = '';
let container;
let imgEdit;
let imgDel;
const checklistArr = [];
const taskArr = [];

// grabId function
const grabId = event => {
    // grab id of target
    const target = event.target.id;
    const idArr = target.split('t');
    id = idArr[1];    

    // call function and pass in id
    fetchChecklists(id);
};

// fetchChecklists function
const fetchChecklists = () => {
    // if container element was previously populated, then remove   
    if (container !== undefined) {
        container.remove();
    }
    
    // id = '' (on load)
    if (id === '') {
        // set api url
        const checklistApiUrl = '/api/checklists/';

        // fetch checklist data
        fetch(checklistApiUrl)
        .then(checklistData => {
            // return data in json format
            return checklistData.json();
        })
        .then(checklistData => {
            // split name element from sidebar
            username = nameUser.split("'");
            // grab name as result of split
            const user = username[0];

            // get length of array
            const dataLength = checklistData.length;

            // loop to push user's checklist into personal array
            for (i = 0; i < dataLength; i++) {
                if (checklistData[i].user.name === user) {
                    checklistArr.push(checklistData[i]);
                }
            }

            // check if user has checklists
            if (checklistArr.length !== 0) {
                // store current checklist values
                const checklistName = checklistArr[0].checklist_name;  

                // call functions
                displayChecklist(checklistName);
                displayTasks(checklistArr[0]);
            }
            // if no checklists for that user (new user/deleted all checklists)
            else {
                // create new checklist via post request
                fetch('/api/checklists', {
                    method: 'POST',
                    body: JSON.stringify({
                        checklist_name: 'Your First Checklist'
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(checklistData => {
                    return checklistData.json();
                })
                .then(checklistData => {
                    console.log(checklistData);
                    id = checklistData.id;
                })
                .catch(err => {
                    console.log(err);
                });

                // refresh page
                location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    // if have id
    else {
        // api url
        const checklistApiUrl = `http://localhost:3333/api/checklists/${id}`;

        // fetch checklist data
        fetch(checklistApiUrl)
        .then(checklistData => {
            // return data in json format
            return checklistData.json();
        })
        .then(checklistData => {
            // store current checklist name
            const checklistName = checklistData.checklist_name;   
            // call functions
            displayChecklist(checklistName);
            displayTasks(checklistData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    // timeout to give fetch time to complete
    setTimeout(() => {
        const addTaskBtn = document.querySelector('#add-new-task-btn');
        addTaskBtn.addEventListener('click', addTaskHandler);
    }, 100);
};

// displayChecklist function
const displayChecklist = checklistName => {
    // grab element
    const listName = document.querySelector('#list-name-header');
    
    // give element textcontent
    listName.textContent = checklistName;
};

// delayJavascript function
const delayJavascript = () => {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve('');
        }, 250);
      });
}

// reloadEventListener function
async function reloadEventListener() {
    const result = await delayJavascript();
    $('.date-modal-btn').click(function(e) {
        console.log('get task data summoned')
    
        // get the task data name
        mostRecentTask = $(this).parent().next().find('p').html();
    })
    console.log(result);
}

// displayTasks function
const displayTasks = (data) => {
    // create random variable
    const random = Math.random();

    // dinamically generate task elements in divContainer
    
    const divContainer = document.querySelector('.container-holder');

    container = document.createElement('div');
    container.className = 'task-container container';
    container.setAttribute('id', 'container' + random)

    divContainer.appendChild(container);

    // loop to display tasks
    for (i = 0; i < data.tasks.length; i++) {
           
        const taskEl = document.createElement('div');
        taskEl.className = 'row task';      

        container.appendChild(taskEl);
        
        const divCheck = document.createElement('div');
        divCheck.className = 'col-md-1 check';
        const divDue = document.createElement('div');
        divDue.className = 'due col-md-2';
        const divTaskItem = document.createElement('div');
        divTaskItem.className = 'col-md-6 task-item';
        const divEdit = document.createElement('div');
        divEdit.className = 'col-md-2';

        taskEl.appendChild(divCheck);
        taskEl.appendChild(divDue);
        taskEl.appendChild(divTaskItem);
        taskEl.appendChild(divEdit);

        const divRadio = document.createElement('div');
        divRadio.className = 'radio';
        const inpCheckbox = document.createElement('input');
        inpCheckbox.className = 'complete-checkbox';
        inpCheckbox.setAttribute('type', 'checkbox');

        divCheck.appendChild(divRadio);
        divRadio.appendChild(inpCheckbox);

        const btnDate = document.createElement('button');
        btnDate.className = 'btn btn-sm date-modal-btn';
        btnDate.setAttribute('type', 'button');
        btnDate.setAttribute('data-toggle', 'modal');
        btnDate.setAttribute('data-target', '#dueDateModal');
        btnDate.textContent = 'Due Date';

        divDue.appendChild(btnDate);

        const pName = document.createElement('p');
        pName.textContent = data.tasks[i].name;

        divTaskItem.appendChild(pName);

        const divEditDel = document.createElement('div');
        divEditDel.className = 'edit-delete-div';

        divEdit.appendChild(divEditDel);
        
        const divBtnEdit = document.createElement('div');
        divBtnEdit.className = 'edit-btn';
        const divBtnDel = document.createElement('div');
        divBtnDel.className = 'delete-btn';

        divEditDel.appendChild(divBtnEdit);
        divEditDel.appendChild(divBtnDel);

        imgEdit = document.createElement('img');
        imgEdit.className = 'task-edit-btn';
        imgEdit.setAttribute('src', './images/edit.svg');
        imgEdit.setAttribute('alt', 'edit button');
        imgEdit.setAttribute('id', 'id' + data.tasks[i].id)

        divBtnEdit.appendChild(imgEdit);

        imgDel = document.createElement('img');
        imgDel.className = 'task-delete-btn';
        imgDel.setAttribute('src', './images/minus.svg');
        imgDel.setAttribute('alt', 'delete button');
        imgDel.setAttribute('id', 'id' + data.tasks[i].id);

        divBtnDel.appendChild(imgDel);
    }

    // if checklist has at least 1 task
    if (data.tasks.length !== 0) {
        // set timeout to give dinamically generate elements to load
        setTimeout(() => {
            // grab elements
            const editTaskbtn = document.querySelectorAll('.task-edit-btn');
            const rmvTaskbtn = document.querySelectorAll('.task-delete-btn');
            const unckAllTasksBtn = document.querySelector('#reset-tasks-btn');
            const delAllTasksBtn = document.querySelector('#clear-all-btn');
            
            // create event listeners
            unckAllTasksBtn.addEventListener('click', unckAllTasksHandler);
            delAllTasksBtn.addEventListener('click', delAllTasksHandler);
            
            // loop to give each button a listener
            for (let i = 0; i < editTaskbtn.length; i++) {
                editTaskbtn[i].addEventListener('click', editTaskHandler);
                rmvTaskbtn[i].addEventListener('click', rmvTaskHandler);
            }
                  
        }, 100);
    }

    reloadEventListener();
};

// editTaskHandler function
const editTaskHandler = event => {
    // grab target id
    const target = event.target.id;
    // split to grab id
    const idArr = target.split('d');
    // id located in index 1
    const taskId = idArr[1];

    // document.location.replace('/edit-task')
    document.location.replace(`/edit-task?id=${taskId}`);
};

// rmvTaskHandler function
const rmvTaskHandler = event => {  
    const target = event.target.id;
    const idArr = target.split('d');
    const taskId = idArr[1];

    // remove task via delete method
    fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
    });

    location.reload();
};

// addTaskHandler function
const addTaskHandler = () => {
    if (id === '') {
        const checklistApiUrl = 'http://localhost:3333/api/checklists/';

        // fetch checklist data
        fetch(checklistApiUrl)
        .then(checklistData => {
            // return data in json format
            return checklistData.json();
        })
        .then(checklistData => {
            id = checklistData[0].id;
        })
        .catch(err => {
            console.log(err);
        });
    }

    // grab input 
    const newTask = document.querySelector('input[id="new-task-input"]');
    
    // set timeout to allow fetch to complete
    setTimeout(() => {
        // if user inputed a value
        if (newTask.value !== '') {
            // add task via post request
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    checklist_id: id,
                    name: newTask.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            location.reload();
        } 
    }, 100);
    
};

// delAllTasksHandler function
const delAllTasksHandler = () => {
    if (id === '') {
        const checklistApiUrl = 'http://localhost:3333/api/checklists/';

        // fetch checklist data
        fetch(checklistApiUrl)
        .then(checklistData => {
            // return data in json format
            return checklistData.json();
        })
        .then(checklistData => {
            id = checklistData[0].id;
        })
        .catch(err => {
            console.log(err);
        });
    }

    // set timeout to allow fetch request to complete
    setTimeout(() => {
        const checklistApiUrl = `http://localhost:3333/api/checklists/${id}`;
        fetch(checklistApiUrl)
        .then(checklistData => {
            return checklistData.json();
        })
        .then(checklistData => {
            // for loop to delete all tasks in checklist
            for (let i = 0; i < checklistData.tasks.length; i++) {
                fetch(`/api/tasks/${checklistData.tasks[i].id}`, {
                    method: 'DELETE'
                });
            }

            setTimeout(() => {
                location.reload();
            }, 100);
        })
        .catch(err => {
            console.log(err);
        });
    }, 50);
    
};

// unckAllTasksHandler function
const unckAllTasksHandler = () => {
    // grab element
    const allCheckboxes = document.querySelectorAll('.complete-checkbox');

    // loop to set all tasks checkboxes to false (uncheck)
    for (let i = 0; i < allCheckboxes.length; i++) {
        allCheckboxes[i].checked = false;
    }
};

// function call starts script
fetchChecklists();

// eventlistener
listGroup.addEventListener('click', grabId);