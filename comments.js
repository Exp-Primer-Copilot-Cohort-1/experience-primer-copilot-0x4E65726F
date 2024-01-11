// Create web server 
// 1. Create a web server
// 2. Create a route for the root path
// 3. Create a route for the comments path
// 4. Create a route for the add comment path

// 1. Create a web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// 2. Create a route for the root path
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. Create a route for the comments path
app.get('/comments', function(req, res){
    console.log('GET comments');
    fs.readFile('comments.json', function(err, data){
        if(err){
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// 4. Create a route for the add comment path
app.post('/comments', function(req, res){
    console.log('POST comments');
    fs.readFile('comments.json', function(err, data){
        if(err){
            console.log(err);
        } else {
            var comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log('Comment successfully added');
                    res.json(comments);
                }
            });
        }
    });
});

// 5. Start the server
app.listen(3000, function(){
    console.log('Server running on port 3000');
});