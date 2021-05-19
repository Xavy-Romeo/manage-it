const express = require('express');

const app = express();
const PORT = process.env.PORT || 3333;

const sequelize = require('./config/connection');

// express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

sequelize.sync({force: true})
.then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}!`));
});