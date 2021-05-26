
// get id from button on click
const id = '';

// api url
// const checklistApiUrl = `https://localhost:3333/api/checklists/${id}`;
// const checklistApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=torrance&appid=3a01189ad2669a4fe12bba52ee8f9ead&units=imperial';

const checklistApiUrl = 'http://localhost:3333/api/checklists/12';

// fetch checklist data
fetch(checklistApiUrl)
.then(checklistData => {
    return checklistData.json();
})
.then(checklistData => {
    const checklistName = checklistData.checklist_name;
    // const checklistName = checklistData.city.coord.lat;    

    // call function and pass in data
    displayChecklist(checklistName);
})
.catch(err => {
    console.log(err);
});

const displayChecklist = checklistName => {
    const listName = document.querySelector('#list-name-header');
    
    listName.textContent = checklistName;
    console.log(checklistName);
};