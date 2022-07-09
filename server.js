const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const errorHandler = require('./server/middlewares/errorHandler');

const PORT = process.env.PORT || 4000;

//################# routes ##############
app.use('/login', require('./server/routes/auth'));
app.use('/', require('./server/routes/root'));

//to handle all no used paths
// app.all("*", (req, res) => {
//     res.status(404)
//     if (req.accepts('html')) { //to handle html, express handles html content types.
//         res.send("<h1>Error 404 Not Found</h1>");
//     }
//     else if (req.accepts('json')) {//if the request is an 404 json
//         res.json({error: "404 Not Found"});
//     }
//     else {
//         res.type('txt').send("404 Not Found");
//     }
// });

app.use(errorHandler); //custom errorHandler

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
