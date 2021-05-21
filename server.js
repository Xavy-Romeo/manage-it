const express = require('express');
var exphbs  = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3333;

const sequelize = require('./config/connection');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./controllers'));

sequelize.sync({force: true})
.then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}!`));
});