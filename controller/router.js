var hack = require('./../game/hacking.js');
var game = require('./../game/login.js');

exports.route = function(route, socket) {
	
	route.get('/Hacking',game.auth, hack.main);
	route.get('/', function(req, res) {
		res.send('vikat');
	})
	
	
//	route.post('/scanner', hack.tool);
//	route.post('bruter', hack.tool);
	route.get('/login',game.show_login);
	route.post('/login', game.login);

}
