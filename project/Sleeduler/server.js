var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

var MongoClient = require('mongodb').MongoClient

var dbpassword = process.env.MONGO_PASSWORD; //bjarne1

var db;

var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.username);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    db.collection('account').findOne({_id: id}, function(err, user) {
      done(err, user);
    });
  });

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log('LocalStrategy', username, password);
      db.collection('account').findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      console.log('login check');
      console.log(user);
      if (user == null) {
        console.log('Incorrect username.');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        console.log('Incorrect password.');
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('login pass');
      return done(null, user);
    });
  }
));

app.post('/api/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/' + req.user.username);
  });                                

app.post('/api/login/register', function(req, res) {
    console.log("click");
    console.log(res);
    var newAccount = {
        username: req.body.username,
        password: req.body.password,
    };
    db.collection('account').find({username: req.body.username}).toArray(function (err, ckeck) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (ckeck.length == 0) {
            db.collection('account').insertOne(newAccount, function(err, result) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                db.collection('account').find({}).toArray(function (err, result) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(result);
                });
            })
        } else if (ckeck) {
            console.log("exist");
            res.json(ckeck);
        }
    });
});

app.get('/api/login/:username', function(req, res) {
    console.log("usename");
    db.collection('data').find({username: req.param.username}).toArray(function (err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(result);
    });
});

app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
    });

MongoClient.connect('mongodb://cs336:'+dbpassword+'@ds157843.mlab.com:57843/cs336', function (err, client) {
  if (err) throw err

  db = client;
  
  
  db.collection('account').find({}).toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })

})