// grab button with id new-list-btn
const newListBtn = document.querySelector('#new-list-btn');

// new list handler function
const newListHandler = event => {
    // prevent refesh
    event.preventDefault();

    // relocate to /add-new
    document.location.replace('/add-new');
};

// newListBtn click event listener
newListBtn.addEventListener('click', newListHandler);