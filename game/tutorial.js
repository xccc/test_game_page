var db = require('./../server/mysql.js')
exports.new_mission = function(level, socket) {
	db.query("SELECT * FROM missions WHERE player_name='dima' AND level='" + level + "' AND access='1'", function(data) {
		socket.of('/missions').emit('mission-data', { data: data[0].info });
		
	})
	
	console.log('here i am..');
}
exports.start = function(req, res) {
	var open_missions = [];
	var closed_missions = [];
	
	
	
	
	db.query("SELECT * FROM missions WHERE player_name='dima'", function(data) {
		var cnt = 0;
		for(var i in data) {
			if(data[i].access == 1) {
				open_missions[cnt] = {};
				open_missions[cnt]['level'] = data[i].level;
				open_missions[cnt]['desc'] = data[i].desc;
				cnt++;
			} }
		var cnt = 0;
		for(var i in data) {
			if(data[i].access != 1) {				
				closed_missions[cnt] = {};
				closed_missions[cnt]['level'] = data[i].level;
				closed_missions[cnt]['desc'] = data[i].desc;
				cnt++;
				
			}
		}
		

		res.render('missions.jade', {missions_open: open_missions, missions_closed: closed_missions });
		
		  
		  
		
		
	})
	//s.send('kusi');
	
		
		
		
}
