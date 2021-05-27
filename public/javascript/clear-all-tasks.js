async function clearAllTasksHandler(event) {
    event.preventDefault();
    console.log('i was clicked');
};

document.querySelector('#clear-all-btn').addEventListener('click', clearAllTasksHandler);