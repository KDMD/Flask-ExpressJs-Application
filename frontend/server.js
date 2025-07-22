const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="POST">
            <input type="text" name="name" placeholder="Enter name" required/>
            <input type="email" name="email" placeholder="Enter email" required/>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/submit', async (req, res) => {
    try {
        const { name, email } = req.body;
        const response = await axios.post('http://backend:5000/api/data', {
            name,
            email
        });
        res.send(`Response from backend: ${response.data.message}`);
    } catch (error) {
        res.status(500).send('Error contacting backend');
    }
});

app.listen(port, () => {
    console.log(`Frontend running on http://0.0.0.0:${port}`);
});
