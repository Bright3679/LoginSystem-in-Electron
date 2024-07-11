const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// ipcMain.on('/register', async (event, credentials) => {
//     try {
//         const { username, password } = credentials;
//         const existingUser = await executeQuery(`SELECT * FROM Persons WHERE name = @username`, { username });
//         if (existingUser.length > 0) {
//             event.reply('register-failed', { message: 'Username already exists' });
//             return;
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         await executeQuery(`INSERT INTO Persons (name, password) VALUES (@username, @hashedPassword)`, { username, hashedPassword });
//         event.reply('register-successful', { message: 'User registered successfully' });
//     } catch (err) {
//         console.error('Registration Error:', err);
//         event.reply('register-error', { message: 'Internal server error' });
//     }
// });

// ipcMain.on('/login', async (event, credentials) => {
//     try {
//         const { username, password } = credentials;
//         const user = await executeQuery(`SELECT * FROM Persons WHERE name = @username`, { username });
//         if (user.length === 0) {
//             event.reply('login-failed', { message: 'Invalid username or password' });
//             return;
//         }
//         const passwordMatch = await bcrypt.compare(password, user[0].password);
//         if (!passwordMatch) {
//             event.reply('login-failed', { message: 'Invalid username or password' });
//             return;
//         }
//         const token = jwt.sign({ username: user[0].name }, 'hello@123', { expiresIn: '1h' });
//         event.reply('login-successful', { token });
//     } catch (err) {
//         console.error('Login Error:', err);
//         event.reply('login-error', { message: 'Internal server error' });
//     }
// });