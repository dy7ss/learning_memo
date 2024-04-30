const express = require('express');
const app = express();
const fs = require('fs');


app.get('/getMemoList', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/getMemoList.json', 'utf8'));
    res.send(data);
});

app.post('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/test2.json', 'utf8'));
    res.send(data);
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
