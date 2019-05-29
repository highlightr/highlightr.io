// configure from env variables...
const envFile = `./env/${process.env.NODE_ENV || 'development'}.env`;
require('dotenv').config({path: envFile})

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const db = require('./models')
const controllers = require('./controllers')

// use body-parser middleware to populate req.body
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}))
app.use(bodyParser.json())
//app.use(bodyParser.raw())

//Prevent CORS errors
//From Wayfarer
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/', (req, res) => res.send('Access API at /api'))

// TODO: document API
app.get('/api', (req, res) => res.send('Hello, world!'))

app.get('/api/users', controllers.user.index)
app.post('/api/users', controllers.user.create)
app.get('/api/users/:user_id', controllers.user.show)
app.patch('/api/users/:user_id', controllers.user.update)
app.delete('/api/users/:user_id', controllers.user.destroy)

app.get('/api/articles', controllers.article.index) // for testing only!
app.post('/api/articles', controllers.article.create)
app.get('/api/articles/:slug', controllers.article.show)
app.patch('/api/articles/:slug', controllers.article.update)
app.delete('/api/articles/:slug', controllers.article.destroy)

// show page
app.get('/highlights/:slug', controllers.article.showHtml)

// Heroku uses $PORT
const port = process.env.PORT || process.env.API_PORT

app.listen(port, () => console.log(`API Server running on port http://localhost:${port}.`))
