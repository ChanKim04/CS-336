/*  Homework03
 *  
 * created Fall 2018 (11/15) 
 * @author: Chan Kim (ck45) for CS 336 at Calvin College  
 */

function Person(firstName, lastName, loginID, startDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.loginID = loginID;
    this.startDate = startDate;
}

// Originally from http://jsfiddle.net/codeandcloud/n33RJ/ by Naveen Jose.
getDate = function(startDate) {
    var today = new Date();
    var startDate = new Date(startDate);
    var date = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        date--;
    }
    return date;
}

const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const path = require('path');

var MongoClient = require('mongodb').MongoClient

var dbpassword = process.env.MONGO_PASSWORD; //bjarne1

var db;

const HOST = "localhost";
const PORT = 3000;
var people;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/people', function(req, res) {
    db.collection('homework3').find().toArray(function (err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(result);
    });
});

app.post('/api/people', function(req, res) {
     var newPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginID: req.body.loginID,
        startDate: req.body.startDate
    };
    db.collection('homework3').insertOne(newPerson, function(err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(result);
    })
});

// a list of all people objects
app.get('/people', function(req, res) {
    db.collection('homework3').find().toArray(function (err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(result);
    });
});

// the full record for the person with the given ID
app.get('/person/:id', function(req, res) {
    var loginID = req.params.id;
    db.collection('homework3').findOne({loginID: loginID}, function (err, result) {  
        console.log(result)      
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (result == null){
            res.sendStatus(404);
        }
        res.json(result);
    });
});

// the full name (i.e., first & last concatenated into one string) for the person with the given ID
app.get('/person/:id/name', function(req, res) {
    var loginID = req.params.id;
    db.collection('homework3').findOne({loginID: loginID}, function (err, result) {  
        console.log(result)      
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (result == null){
            res.sendStatus(404);
        }
        res.json(result["firstName"] + " " + result["lastName"]);
    });
});

// the seniority (i.e., number of years with the organization) of the person with the given ID — Report this as you would report an age (i.e., rounded down to the nearest whole year).
app.get('/person/:id/years', function(req, res) {
    var loginID = req.params.id;
    db.collection('homework3').findOne({loginID: loginID}, function (err, result) {  
        console.log(result)      
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (result == null){
            res.sendStatus(404);
        }
        res.json(result["startDate"]);
    });
});

app.post('/save', function(req, res) {
    var newPerson = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        loginID: req.body.login_id,
        startDate: req.body.start_date
    };
    db.collection('homework3').insertOne(newPerson, function(err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(result);
    })
});

app.delete('/person/:id', function(req, res) {
    var loginID = req.params.id;
    try {
        db.collection('homework3').deleteOne({loginID: loginID}); 

    } catch (e) {
        res.json(e);
    }
});

app.put('/person/:id', function(req, res) {
    var loginID = req.params.id;
    try {
    db.collection('homework3').updateOne({loginID: loginID}, 
        { $set:
            {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                loginID: req.body.login_id,
                startDate: req.body.start_date
            } 
        }
    );
    } catch (e) {
        res.json(e);
    }
});

app.post('/person/:id', function(req, res) {
    var loginID = req.params.id;
    db.collection('homework3').findOne({loginID: loginID}, function (err, result) {  
        console.log(result)      
        if (err) {
            console.error(err);
            process.exit(1);
        } else if (result == null){
            res.sendStatus(404);
        }
        res.json(result);
    });
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});

MongoClient.connect('mongodb://cs336:'+dbpassword+'@ds157843.mlab.com:57843/cs336', function (err, client) {
  if (err) throw err

  db = client;
  
  db.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })

})