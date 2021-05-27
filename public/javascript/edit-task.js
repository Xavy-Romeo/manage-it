const returnHomeBtn = document.querySelector('#return-home-btn');
const taskForm = document.querySelector('#save-changes-btn');

// write function to redirect them to home
const routeHome = () => {
    // testing event listener
    document.location.replace('/');
}

// write function to save changes to task
const saveTaskChanges = () =>{
    const newTask = document.querySelector('input[id="task-input"]');

    const currentLocation = document.location;
    const locationArr = currentLocation.toString().split('=');
    const id = locationArr[1];

    if (newTask.value !== '') {
        fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: newTask.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    setTimeout(() => {
        location.replace('/');
    }, 100);
};

// taskForm.addEventListener('submit', saveTaskChanges)
returnHomeBtn.addEventListener('click', routeHome);
taskForm.addEventListener('click', saveTaskChanges);