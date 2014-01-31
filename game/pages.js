var db = require('./game.js');
exports.ip = function(req, res) {
	if(req.url == '/IP/JOIN') {
			
		db.update("UPDATE ip_db SET access='1' WHERE game_value='localhost' AND player_name='dima'"); // add user VPN to ip database
		db.update("UPDATE ip_db SET access='1' WHERE game_value='basic_mail' AND player_name='dima'"); 
		res.redirect('/IP');
		
		
		
	}
	
	var Game = new db.create('dima');
	var message = '';
	Game.IP_db(function(data) {
		if(data.length == 0) {
			message = 'gangsta'
		}
		res.render('ip.jade', {info: message, list: data});
	})
	
	
	
}
