const express = require("express")
const bodyParser = require("body-parser")

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))


app.get('/add-product', (req, res) => {
    res.send(`
    <form action="/add-product" method="post">
    <label for="product-name">Product Name:</label>
    <input type="text" id="product-name" name="productName">
    <button type="submit">Add Product</button>
    </form>
    `);
});


app.post('/add-product', (req, res) => {
    console.log(req.body);
    res.send('Product added successfully!');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});