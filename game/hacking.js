var Db = require('./../player/player.js');
var game_lib = require('./../game/game.js');
var server = require('./../server/server.js');
var Db = require('./../player/player.js');
exports.main = function(req, resp) {
	
	var Player = new Db.d(req.session.username);

	resp.render('hacking.jade',{user: req.session.username});
	
	


Player.all_activities(function(playerActivity) {
	
	if(playerActivity.length != 0)  {
		
		for(var i in playerActivity) {
			if(playerActivity[i].time < server.server_time()) {
				Player.deleteActivity(playerActivity[i].task);
				if(playerActivity[i].task == 'scanning') {
				
					Player.scanning_done();
				}
				else {
					
					Player.cracking_done();
			}
		}
	
}
}
})

}





