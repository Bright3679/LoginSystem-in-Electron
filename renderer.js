document.getElementById('registerBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').innerText = 'User registered successfully!';
        } else {
            document.getElementById('message').innerText = data.message;
        }
    } catch (err) {
        console.error(err);
        document.getElementById('message').innerText = `Error: ${err.message}`;
    }
});

document.getElementById('loginBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            document.getElementById('message').innerText = 'Login successful!';
        } else {
            document.getElementById('message').innerText = data.message;
        }
    } catch (err) {
        console.error(err);
        document.getElementById('message').innerText = `Error: ${err.message}`;
    }
});
