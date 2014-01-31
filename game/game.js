mysql = require('mysql');


var db = mysql.createConnection({
	host: 'localhost',
	user: 'mysql',
	password: '',
	database: 'pela' //test
	})
db.connect();
exports.update = function(query) {
	db.query(query);
	
}

exports.create = function Game(player) {
	{
		this.player;
}
Game.prototype.get_connection = function(callback) {
	db.query("SELECT * FROM ip_db WHERE player_name='" + player + "' AND connected='connection'", function(e, data) {
		callback(data);
	})
}
 
Game.prototype.get_node = function(ip_addr, callback) {
	db.query("SELECT * FROM npc_db WHERE ip_addr='" + ip_addr + "'", function(e, data) {
		callback(data);
	})
}
Game.prototype.IP_db = function(callback) {
	
	db.query("SELECT * FROM ip_db WHERE player_name='" + player + "' AND access='1'", function(e, data) {
		callback(data);
	})
}
	
Game.prototype.node_check = function(ip, callback) {
		db.query("SELECT * FROM ip_db WHERE player_name='" + player + "' AND access='1' AND ip_addr='" + ip + "'", function(e, data) {
		callback(data);
	})
	
}

Game.prototype.get_tools = function(tool_name, callback) {
	var sql = db.query("SELECT * FROM Tools WHERE tool_name = ?", tool_name);
	sql.on('result', function(result) {
		callback(result);
	})
	

}
Game.prototype.npc = function(callback) {
	db.query("SELECT * FROM NPC", function(e, data) {
		callback(data);
	})
}
Game.prototype.getXp = function(p_level) {

	var player_lvl = p_level;
	var npc_lvl = 1;
	var xp_given = 50;
	
			// Calculates xp based on user and npc level
	if (player_lvl > npc_lvl) {
		
		var first = (player_lvl - npc_lvl)*10; 
		 // if first is bigger than hip-hop then 90, othewise it stays the same
		var second = (first > 90) ? 90 : first;
			// return xp
		return (xp_given - ((second/100)*xp_given));
		
			
	} else if(player_lvl < npc_lvl) {
		var first = (npc_lvl-player_lvl)*10;
		var second = (first > 90) ? 90 : first;
	
		return  (xp_given + ((second/100)*xp_given));
		
	}	else {
		
		return xp_given;
	}

}
}



