async function signupFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#name-input').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const phone_number = document.querySelector('#tel-signup').value.trim();

    if (name && email && phone_number && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                name,
                email,
                password,
                phone_number
            }),
            headers: {'Content-Type': "application/json"}
        })
        if (response.ok) {
            console.log('success');
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);