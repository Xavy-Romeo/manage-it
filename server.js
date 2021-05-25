// require dependencies
const express = require('express');
var exphbs  = require('express-handlebars');

// instantiate the server
const app = express();
// creating a port for server
const PORT = process.env.PORT || 3333;

// sequelize connection
const sequelize = require('./config/connection');

// handlebar engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// use routes
app.use(require('./controllers'));

// sync sequelize tables if true, then start server connection 
sequelize.sync({force: false})
.then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}!`));
});