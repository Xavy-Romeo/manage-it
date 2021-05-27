const nameUser = document.querySelector('.user-name').textContent.trim();
const taskContainerEl = document.querySelector('.task-container');
const taskItemEl = document.querySelector('task-item');
const listGroup = document.querySelector('.list-group');
const addTaskBtn = document.querySelector('#add-new-task-btn');
const delAllTasksBtn = document.querySelector('#clear-all-btn');
const unckAllTasksBtn = document.querySelector('#reset-tasks-btn');

// declaring global variables
let id = '';
let container;
let imgEdit;
let imgDel;
const checklistArr = [];
const taskArr = [];

const grabId = event => {
    const target = event.target.id;
    const idArr = target.split('t');
    id = idArr[1];    

    // checklistArr.unshift(checklistArr[(id - 1)]);
    // console.log(checklistArr)

    fetchChecklists(id);
};

const fetchChecklists = () => {   
    if (container !== undefined) {
        container.remove();
    }
    
    if (id === '') {
        const checklistApiUrl = 'http://localhost:3333/api/checklists/';

        // fetch checklist data
        fetch(checklistApiUrl)
        .then(checklistData => {
            // return data in json format
            return checklistData.json();
        })
        .then(checklistData => {
            const username = nameUser.split("'");
            const user = username[0];
            const dataLength = checklistData.length;

            for (i = 0; i < dataLength; i++) {
                if (checklistData[i].user.name === user) {
                    checklistArr.push(checklistData[i]);
                }
            }

            // store current checklist values
            const checklistName = checklistData[0].checklist_name;  

            // call function and pass in data
            displayChecklist(checklistName);
            displayTasks(checklistData[0]);
        })
        .catch(err => {
            console.log(err);
        });
    }
    else {
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
            // call function and pass in data
            displayChecklist(checklistName);
            displayTasks(checklistData);
        })
        .catch(err => {
            console.log(err);
        });
    }

};

const displayChecklist = checklistName => {
    const listName = document.querySelector('#list-name-header');
    
    listName.textContent = checklistName;
};

const displayTasks = (data) => {
    const random = Math.random();

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

    if (data.tasks.length !== 0) {
        setTimeout(() => {
            const editTaskbtn = document.querySelectorAll('.task-edit-btn');
            const rmvTaskbtn = document.querySelectorAll('.task-delete-btn');

            for (let i = 0; i < editTaskbtn.length; i++) {
                editTaskbtn[i].addEventListener('click', editTaskHandler);
                rmvTaskbtn[i].addEventListener('click', rmvTaskHandler);
            }
                  
        }, 100);
    }
};

const editTaskHandler = event => {
    const target = event.target.id;
    const idArr = target.split('d');
    const taskId = idArr[1];

    document.location.replace(`/edit-task?id=${taskId}`);
};

const rmvTaskHandler = () => {  
    const target = event.target.id;
    const idArr = target.split('d');
    const taskId = idArr[1];

    fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
    });

    location.reload();
};

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

    const newTask = document.querySelector('input[id="new-task-input"]');
    setTimeout(() => {
        if (newTask.value !== '') {
            // const addTask = 
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

    setTimeout(() => {
        const checklistApiUrl = `http://localhost:3333/api/checklists/${id}`;
        fetch(checklistApiUrl)
        .then(checklistData => {
            return checklistData.json();
        })
        .then(checklistData => {
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

const unckAllTasksHandler = () => {
    const allCheckboxes = document.querySelectorAll('.complete-checkbox');

    for (let i = 0; i < allCheckboxes.length; i++) {
        allCheckboxes[i].checked = false;
    }
};








// write a function to check if id = ''... then set id


fetchChecklists();

listGroup.addEventListener('click', grabId);
addTaskBtn.addEventListener('click', addTaskHandler);
unckAllTasksBtn.addEventListener('click', unckAllTasksHandler);
delAllTasksBtn.addEventListener('click', delAllTasksHandler);