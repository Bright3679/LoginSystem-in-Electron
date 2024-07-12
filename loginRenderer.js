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
            Swal.fire({
                title: "Success",
                text: 'Login successful!',
                icon: "success",
                backdrop: false
            });
        } else {
            document.getElementById('message').innerText = data.message;
            Swal.fire({
                title: "Error",
                text: data.message,
                icon: "error",
                backdrop: false
            });
        }
    } catch (err) {
        console.error(err);
        document.getElementById('message').innerText = `Error: ${err.message}`;
        Swal.fire({
            title: "Error",
            text: err.message,
            icon: "error",
            backdrop: false
        });
    }
});
