/*  Homework02
 *  
 * created Fall 2018 (10/26) 
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

// var person01 = new Person("Chan", "Kim", "ck45", "12/13/1990");
// var person02 = new Person("Mark", "Hofman", "mk34", "01/01/1982");
// var person03 = new Person("Matthew", "Jones", "mj67", "11/04/1986")

// // create a list of people
// var people = [];

// people.push(person01);
// people.push(person02);
// people.push(person03);

const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const path = require('path');

const COMMENTS_FILE = path.join(__dirname, 'people.json');

const HOST = "localhost";
const PORT = 3000;
var people;

fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    people = JSON.parse(data);
});


app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// respond with "Homework01" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//     res.send('Homework01');
// });

// a list of all people objects
app.get('/people', function(req, res) {
        res.json(people);
});

// the full record for the person with the given ID
app.get('/person/:id', function(req, res) {
    var loginID = req.params.id;
    for (i of people) {
        if (loginID == i.loginID) {
            res.json(i);
            return;
        }
    }
    res.sendStatus(404);
});

// the full name (i.e., first & last concatenated into one string) for the person with the given ID
app.get('/person/:id/name', function(req, res) {
    var loginID = req.params.id;
    for (i of people) {
        if (loginID == i.loginID) {
            res.json(i.firstName + " " + i.lastName);
            return;
        }
    }
    res.sendStatus(404);
});

// the seniority (i.e., number of years with the organization) of the person with the given ID — Report this as you would report an age (i.e., rounded down to the nearest whole year).
app.get('/person/:id/years', function(req, res) {
    var loginID = req.params.id;
    for (i of people) {
        if (loginID == i.loginID) {
            res.json(getDate(i.startDate));
            return;
        }
    }
    res.sendStatus(404);
});

app.post('/save', function(req, res) {
    var newPerson = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        loginID: req.body.login_id,
        startDate: req.body.start_date
    };
    people.push(newPerson);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(people, null, 4), function(err){});
});

app.delete('/person/:id', function(req, res) {
    var loginID = req.params.id;
    for (i of people) {
        if (loginID == i.loginID) {
            delete i;
            fs.writeFile(COMMENTS_FILE, JSON.stringify(people, null, 4), function(err){});
            return;
        }
    }
    res.sendStatus(404);
});

app.put('/person/:id', function(req, res) {
    var loginID = req.params.id;
    for (i of people) {
        if (loginID == i.loginID) {
            i.firstName = req.body.firstName;
            i.lastName = req.body.lastName;
            i.loginID = req.body.loginID;
            i.startDate = req.body.startDate;
            fs.writeFile(COMMENTS_FILE, JSON.stringify(people, null, 4), function(err){});
            return;
        }
    }
    res.sendStatus(404);
});

app.post('/person/:id', function(req, res) {
    var loginID = req.params.id
    for (i of people) {
        if (loginID == i.loginID) {
            res.json(i);
            return;
        }
    }
    res.sendStatus(404);
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
