const express = require('express');
const bodyParser = require('body-parser');
const path = require("path")

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contactUs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use( shopRoutes);
app.use( contactRoutes);

// Route for the success page
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, console.log("server is running on port 3000"));
