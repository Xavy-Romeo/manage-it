// get id from button on click
const id = '';

// api url
// const checklistApiUrl = `https://localhost:3333/api/checklists/${id}`;

const checklistApiUrl = 'http://localhost:3333/api/checklists/13';

// fetch checklist data
fetch(checklistApiUrl)
.then(checklistData => {
    // return data in json format
    return checklistData.json();
})
.then(checklistData => {
    // store data in constants
    const checklistName = checklistData.checklist_name;   

    // call function and pass in data
    displayChecklist(checklistName);
})
.catch(err => {
    console.log(err);
});

const displayChecklist = checklistName => {
    const listName = document.querySelector('#list-name-header');
    
    listName.textContent = checklistName;
};