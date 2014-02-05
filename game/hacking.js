var Db = require('./../player/player.js');
var game_lib = require('./../game/game.js');
var server = require('./../server/server.js');
var Db = require('./../player/player.js');
var scan = require('./user_action.js');
exports.main = function(req, resp) {
	
	var Player = new Db.d(req.session.username);

	resp.render('hacking.jade',{user: req.session.username});
		
		scan.user_action(req.session.username);
	




}





