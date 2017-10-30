'use strict';

var fs = require('fs');
var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/api/headers').get((req, res) => {
    var headers = req.headers;
    var ip = headers["x-forwarded-for"].split(',')[0];
    var lang = headers["accept-language"].split(',')[0];
    var os = headers["user-agent"].split('(')[1].split(')')[0];
    res.json({
      ip: ip,
      lang: lang,
      os: os.replace(/_/g, '.')
    });
});

app.route('/')
    .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
   })

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

