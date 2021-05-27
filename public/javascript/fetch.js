const nameUser = document.querySelector('.user-name').textContent.trim();

// declaring global variables
let id = '';
const checklistArr = [];
const taskArr = [];

const grabId = event => {
    const target = event.target;
    const targetId = target.getAttribute('id');
    const idArr = targetId.split('t');
    id = idArr[1];
    console.log('id', id);
    

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

            // store current checklist name
            const checklistName = checklistData[0].checklist_name;   

            // call function and pass in data
            displayChecklist(checklistName);
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
        })
        .catch(err => {
            console.log(err);
        });
    }

};
// api url
// ;

// const checklistApiUrl = 'http://localhost:3333/api/checklists/13';



const displayChecklist = checklistName => {
    const listName = document.querySelector('#list-name-header');
    
    listName.textContent = checklistName;
};


fetchChecklists();

document.querySelector('.list-group').addEventListener('click', grabId);