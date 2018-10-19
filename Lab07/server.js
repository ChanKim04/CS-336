// Lab07

// created Fall 2018 (10/17) 
// @author: Chan Kim (ck45) for CS 336 at Calvin College  

const express = require("express")
const app = express();
const bodyParser = require("body-parser")

const HOST = "localhost";
const PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.send("Hello, Lab 7!");
});

app.get("/lab07_1.html", function(req, res) {
    res.send({"content" : "Did we mention that " + req.query.name + " is free!"});
});

app.get("/lab07.html", function(req, res) {
    res.send({"content" : "Did we mention that " + req.query.name + " is free!"});
});

app.get("/hello", function(req, res) {
    res.json(req.query.name);
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
