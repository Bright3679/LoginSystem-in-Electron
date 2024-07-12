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
            Swal.fire({
                title: "Success",
                text: "User registered successfully!",
                icon: "success",
                backdrop: false
            })
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