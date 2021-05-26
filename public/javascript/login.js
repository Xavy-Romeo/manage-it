//document.querySelector("#home-dash-view").style.visibility = "none";

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login',{
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': "application/json"}
        })
        if (response.ok) {
            console.log('response okay')
            document.location.replace('/');
        } else {
            console.log('response not okay')
            alert('Incorrect Password or Email')
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);