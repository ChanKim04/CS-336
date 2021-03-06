// Lab13

// created Fall 2018 (11/28) 
// @author: Chan Kim (ck45) for CS 336 at Calvin College 

/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var MongoClient = require('mongodb').MongoClient

var dbpassword = process.env.MONGO_PASSWORD; //bjarne1

var db;

// Add this at the top, just after the imports.
var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

// app.use('/', express.static(path.join(__dirname, 'dist')));
// Modify the current app.use() command.
app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
    db.collection('lab10').find({}).toArray(function (err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(result);
    });
});

app.post('/api/comments', function(req, res) {
    var newComment = {
        id: Date.now(),
        author: req.body.author,
        text: req.body.text,
    };
    db.collection('lab10').insertOne(newComment, function(err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        db.collection('lab10').find({}).toArray(function (err, result) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(result);
        });
        
    })
});

app.get('/api/comments/:id', function(req, res) {
    db.collection("lab10").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.put('/api/comments/:id', function(req, res) {
    var updateId = Number(req.params.id);
    var update = req.body;
    db.collection('lab10').updateOne(
        { id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection("lab10").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.delete('/api/comments/:id', function(req, res) {
    db.collection("lab10").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection("lab10").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

// Add this at the bottom, just before starting the server.
app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
    });

MongoClient.connect('mongodb://cs336:'+dbpassword+'@ds157843.mlab.com:57843/cs336', function (err, client) {
  if (err) throw err

  db = client;
  
  
  db.collection('lab10').find({}).toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })

})

