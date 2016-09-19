var express = require('express');
var multer = require('multer');
var path = require('path');
var remove = require('remove');

var upload = multer({ dest: 'uploads/' });

var app = express();

app.get('/', function(req, res) {
    res.sendFile('default.html', { root: path.join(__dirname + '/public') });
});

app.post('/upload', upload.single('input'), function(req, res, next) {
    var fileSize = {
        'size': req.file.size
    }
    
    // No point having the file hang around and take up space - delete it.
    remove(req.file.path, function(err) {
        if (err)
            console.log(err);
    });
    
    res.end(JSON.stringify(fileSize));
});

app.listen(process.env.PORT || 5000);