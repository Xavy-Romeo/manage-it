// require dependencies
const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');
const cors = require('cors');

// instantiate the server
const app = express();
// creating a port for server
const PORT = process.env.PORT || 3333;

// sequelize connection
const sequelize = require('./config/connection');
// const { route } = require('./controllers');
// setup store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// session object
const sess = {
    secret: 'Super secret pw !!!***',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// express-session middleware
app.use(session(sess));

// handlebar engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use(routes);

app.use(cors());

// sync sequelize tables if true, then start server connection 
sequelize.sync({force: false})
.then(() => {
    app.listen(PORT, () => console.log(`Now listening on Port ${PORT}!`));
});