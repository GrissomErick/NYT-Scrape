//==============================================================================
// My goals for this Homework
// 1. Get the app working 1st
// 2. Lots of comenting
// 3. Organize and streamline code
// 4. Working brickwall and notepad frontend solutions
//==============================================================================


//dependencies
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');


//initializing the app
const app = express();

//setting up the database
const config = require('./config/database');
mongoose.Promise = Promise;
mongoose
  .connect(config.database)
  .then( result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`)
  })
  .catch(err => console.log('There was an error with your connection:', err));

//adding a favicon since I have time
app.use(favicon(path.join(__dirname, 'public', 'assets/img/favicon.ico')))

//setting up Morgan
app.use(logger('dev'));

//setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setting up handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/articles',express.static(path.join(__dirname, 'public')));
app.use('/notes',express.static(path.join(__dirname, 'public')));


//setting up routes
const index = require('./routes/index')
const articles = require('./routes/articles')
const notes = require('./routes/notes')
const scrape = require('./routes/scrape')

app.use('/', index)
app.use('/articles', articles);
app.use('/notes', notes);
app.use('/scrape', scrape);

//starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`)
});
