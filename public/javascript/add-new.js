console.log('connected')
const returnHomeBtn = document.querySelector("#return-home-btn");
const taskForm = document.querySelector("#add-task")

// write function to redirect them to home
function routeHome() {
    // testing event listener
    console.log(`back to home clicked`);
}

// write function to save changes to task
function saveTaskChanges(event) {
    event.preventDefault();
    // testing event listener
    console.log(`task changes clicked`)
}




taskForm.addEventListener('submit', saveTaskChanges)
returnHomeBtn.addEventListener("click", routeHome)