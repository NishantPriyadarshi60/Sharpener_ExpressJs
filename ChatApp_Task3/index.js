const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Function to read messages from file
function readMessages() {
    try {
        const messages = fs.readFileSync(path.join(__dirname, 'messages.txt'), 'utf8');
        return messages.split('\n').filter(Boolean).map(message => {
            const [username, text] = message.split(':');
            return { username, text };
        });
    } catch (err) {
        console.error("Error reading messages:", err);
        return [];
    }
}

// Function to write message to file
function writeMessage(username, text) {
    try {
        fs.appendFileSync(path.join(__dirname, 'messages.txt'), `${username}: ${text}\n`);
    } catch (err) {
        console.error("Error writing message:", err);
    }
}

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    // Store username in browser's local storage
    res.cookie('username', username);
    res.redirect('/');
});

app.get('/', (req, res) => {
    const username = req.cookies.username || 'Anonymous';
    const messages = readMessages();
    res.send(`
        <h1>Welcome, ${username}!</h1>
        <form action="/message" method="post">
            <input type="text" name="message" placeholder="Type your message..." required>
            <button type="submit">Send</button>
        </form>
        <h2>Messages</h2>
        <ul>
            ${messages.map(message => `<li>${message.username}: ${message.text}</li>`).join('')}
        </ul>
    `);
});

app.post('/message', (req, res) => {
    const username = req.cookies.username || 'Anonymous';
    const { message } = req.body;
    writeMessage(username, message);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});