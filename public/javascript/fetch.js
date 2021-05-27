const nameUser = document.querySelector('.user-name').textContent.trim();
const taskContainerEl = document.querySelector('.task-container');
const taskItemEl = document.querySelector('task-item');

// declaring global variables
let id = '';
let container;
const checklistArr = [];
const taskArr = [];

const grabId = event => {
    if (container !== undefined) {
        container.remove();
    }
    
    const target = event.target;
    const targetId = target.getAttribute('id');
    const idArr = targetId.split('t');
    id = idArr[1];    

    // checklistArr.unshift(checklistArr[(id - 1)]);
    // console.log(checklistArr)



    fetchChecklists(id);

};


const fetchChecklists = () => {    
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

        const imgEdit = document.createElement('img');
        imgEdit.setAttribute('id', 'task-edit-btn');
        imgEdit.setAttribute('src', './images/edit.svg');
        imgEdit.setAttribute('alt', 'edit button');

        divBtnEdit.appendChild(imgEdit);

        const imgDel = document.createElement('img');
        imgDel.setAttribute('id', 'task-delete-btn');
        imgDel.setAttribute('src', './images/minus.svg');
        imgDel.setAttribute('alt', 'delete button');

        divBtnDel.appendChild(imgDel);
    }
};



fetchChecklists();

document.querySelector('.list-group').addEventListener('click', grabId);