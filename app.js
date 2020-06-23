const express = require('express');
const hbs = require('express-handlebars');
const {PORT, SECRET, URL, ROOTPATH} = require('./lib/config/config');
const path = require('path')
const session = require('express-session')
const passport = require('passport');
const strategy = require('./lib/config/passport')
require('./lib/database');
var methodOverride = require('method-override')

const app = express();

//override html methods
app.use(methodOverride('_method'))

//set handlebars as the main view engine
app.engine('handlebars', hbs({
    helpers:{
        url:URL,
        escape: variable => variable.replace(/(['"])/g, '\\$1')
    }
}));
app.set('view engine', 'handlebars');

//parsing data
//parse body
app.use(express.json()) // for parsing application /json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// console.log(path.join(__dirname, "assets"));

//set the path to the assets directory
app.use(express.static(path.join(__dirname, "assets")));

//set up passport authentication and enable use of sessions 
app.use(session({secret: SECRET, resave:false, saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())


strategy(passport)

app.use(ROOTPATH, require('./lib/routes/routes'));
app.use(`${ROOTPATH}auth`, require('./lib/routes/auth'));
app.use(`${ROOTPATH}admin`, require('./lib/routes/admin'))
// console.log(app);

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`))