const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Project Inventory System.')
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))