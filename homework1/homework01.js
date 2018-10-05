/*  Homework01
 *  
 * created Fall 2018 (10/05) 
 * @author: Chan Kim (ck45) for CS 336 at Calvin College  
 */

function Person(firstName, lastName, loginID, startDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.loginID = loginID;
    this.startDate = startDate;
}

// Originally from http://jsfiddle.net/codeandcloud/n33RJ/ by Naveen Jose.
Person.prototype.getDate = function() {
    var today = new Date();
    var startDate = new Date(this.startDate);
    var date = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        date--;
    }
    return date;
}

var person01 = new Person("Chan", "Kim", "ck45", "1990/12/13");
var person02 = new Person("Mark", "Hofman", "mk34", "1982/01/01");
var person03 = new Person("Matthew", "Jones", "mj67", "1986/11/04")

// create a list of people
var people = [];

people.push(person01);
people.push(person02);
people.push(person03);

var express = require('express');
var app = express();
var port = 3000;

// respond with "Homework01" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('Homework01');
});

// a list of all people objects
app.get('/people', function(req, res) {
    res.json(people);
});

// the full record for the person with the given ID
app.get('/people/:id', function(req, res) {
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
app.get('/people/:id/name', function(req, res) {
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
app.get('/people/:id/years', function(req, res) {
    var loginID = req.params.id;
    for (i of people) {
        if (loginID == i.loginID) {
            res.json(i.getDate());
            return;
        }
    }
    res.sendStatus(404);
});

app.listen(port, () => console.log(`Homework01 app listening on port ${port}!`))