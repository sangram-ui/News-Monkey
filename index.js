
const express = require('express');
const path=require('path')
const app = express();
const publicpath=path.join(__dirname,'public')
app.use(express.static(publicpath))


const PORT = process.env.PORT || 0; // Use an available port dynamically
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${server.address().port}`);
});