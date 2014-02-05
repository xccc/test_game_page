var express = require('express');
var app = express();
var http = require('http').createServer(app);
var socket = require('socket.io').listen(http);
var router = require('./controller/router.js');
var sEvents = require('./server/events.js')(socket);
app.set('ipaddr', '192.168.1.34');
app.set('port', '1337');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static('public', __dirname + '/public'));

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "crazysecretstuff"})); // enable sessions xxxxD

router.route(app, socket);





http.listen(app.get('port'), app.get('ipaddr'));
