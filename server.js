const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;
const filePath = 'submissions.json';

// Load existing submissions or initialize an empty array
let submissions = [];
if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    submissions = JSON.parse(fileData);
}

app.post('/submit', (req, res) => {
    const formData = req.body;
    submissions.push(formData);

    // Save updated submissions to the file
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

    res.status(200).send({ message: 'Form submitted successfully!', data: formData });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
