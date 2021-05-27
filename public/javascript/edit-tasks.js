const editTaskHandler = () => {
    console.log('editing task test test test');
};

setTimeout(() => {
    const editTaskbtn = document.querySelector('#task-edit-btn');
    editTaskbtn.addEventListener('click', editTaskHandler); 
}, 2000);
