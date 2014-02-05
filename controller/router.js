var hack = require('./../game/hacking.js');
var game = require('./../game/login.js');
var guide = require('./../game/tutorial.js');
var page = require('./../game/pages.js');
var check_me = require('./game/user_action.js');
exports.route = function(route, socket) {
	route.get('/email', function(req, res) {
		res.render('email.jade');
	})
	route.get('/Hacking',game.auth, hack.main);
	route.get('/', function(req, res) {
		res.render('index.jade');
	})
	
	
//	route.post('/scanner', hack.tool);
//	route.post('bruter', hack.tool);
	route.get('/login',game.show_login);
	route.post('/login', game.login);
	
	route.get('/missions', guide.start);
	route.get('/IP', page.ip);
	route.get('/IP/JOIN', page.ip);
	
	
	route.get('/Scanner', function(req, res) {
	
			check_me.user_action(req.session.username);
		
		
			res.render('scanner.jade', {username: req.session.username});
			

		
	})
}
