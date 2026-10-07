const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve all static layout styles and script assets from the root directory
app.use(express.static(path.join(__dirname)));

// Route endpoint to host your primary dashboard view page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Launch endpoint to start your server infrastructure
app.listen(PORT, () => {
    console.log(`🚀 The Debug Six backend server is running live at: http://localhost:${PORT}`);
});
