var p = require('./../player/player.js');
var server = require('./../server/server.js');
var async = require('async');
exports.user_action = function(username) {
	var Player = new p.d(username); // replace with req.session.username
	
	

		Player.all_activities(function(playerActivity) {
	
		if(playerActivity.length != 0)  {
		
		for(var i in playerActivity) {
			console.log(playerActivity[i] + ' tripperno');
			
			if(Math.max(0, playerActivity[i].time) < server.server_time()) {
				Player.deleteActivity(playerActivity[i].task);
				if(playerActivity[i].task == 'scanning') {
				
					Player.scanning_done();
				}
				else if(playerActivity[i].task == 'cracking') {
					
					Player.cracking_done();
			}
			else if(playerActivity[i].task == 'antivirus') {
				Player.antivirus_done();
			}
		}
	
}
}
})
	
	
}
exports.show_tasks = function(socket) {
	

	Player = new p.d('dima');
	var tasks = {};
	var disable_me = [];
	async.waterfall([
		function(callback) {
			
			Player.getActivity('antivirus', function(data) {
				
					for(var i in data) {
						tasks[data[i].task] = Math.abs(parseInt(data[i].time)-server.server_time());
			
						disable_me.push(data[i].task);
					}
			
						callback()
			})
		}], function() {
			socket.of('/upload').emit('show-task', { player_task: tasks});
		});
	
		
			
			
			
			
		
	

}
		
		//socket.of('/hack').emit('show-task', { player_task: tasks, disable: disable_me});
	


