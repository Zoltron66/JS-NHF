const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


require('./Routes/routeTask') (app);


app.listen(PORT, () => {
  console.log(`A szerver fut a http://localhost:${PORT} címen`);
});