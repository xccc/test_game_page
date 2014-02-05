var db = require('./game.js');
var scan = require('./user_action.js');
exports.ip = function(req, res) {
	var Game = new db.create(req.session.username);
	var message = '';
	var username = req.session.username;
	Game.scan_nodes(); // check slave health status.
	
	
	if(req.url == '/IP/JOIN') {
			
		db.update("UPDATE ip_db SET access='1' WHERE game_value='localhost' AND player_name='" + username + "'"); // add user VPN to ip database
		db.update("UPDATE ip_db SET access='1' WHERE game_value='basic_mail' AND player_name='" + username + "'"); 
		res.redirect('/IP');
		
		
		
	}
	
	
	
	
	
	Game.IP_db(function(infected, cracked) {
		if(infected.length == 0) {
			message = 'gangsta'
		}
		console.log(cracked);
		res.render('ip.jade', {info: message, list: infected, c_list: cracked, user: req.session.username});
		scan.user_action(req.session.username);
	})
	
	
	
}
