mysql = require('mysql');


var db = mysql.createConnection({
	host: 'localhost',
	user: 'mysql',
	password: '',
	database: 'test' //test
	})
db.connect();



exports.update = function(query) {
	db.query(query);
	
}

exports.create = function Game(player) {
	{
		this.player;
}


Game.prototype.delete_viruses = function(data) {
	if(data.length != 0) {
		// Make sure we have found something
		for(var i in data) {
		// i = ip
		// data[i] = virus_id OMFG IM A PIMP
		
			db.query("DELETE FROM npc_db WHERE ip_addr='" + i + "' AND id='" + data[i] + "'"); // delete virus like a boss.
		}
	}
	
	
}

Game.prototype.get_connection = function(callback) {
	db.query("SELECT * FROM ip_db WHERE player_name='" + player + "' AND connected='connection'", function(e, data) {
		callback(data);
	})
}
 
 
Game.prototype.check_item = function(ip_addr, software, callback) {
	db.query("SELECT software FROM npc_db WHERE ip_addr='" + ip_addr + "' AND player_name='" + player + "' AND software='" + software + "'", function(e, data) {
		if(data.length == 0) {
			callback(2);
		} else { callback(1);
	}
		
	})
}
Game.prototype.get_node = function(ip_addr, callback) {
	db.query("SELECT * FROM npc_db WHERE ip_addr='" + ip_addr + "'", function(e, data) {
		callback(data);
	})
}


Game.prototype.IP_db = function(callback) {
	
	db.query("SELECT * FROM ip_db WHERE player_name='" + player + "' AND access='1'", function(e, infected) {
		db.query("SELECT * FROM user_private WHERE user='" + player + "' AND access='1'", function(e, cracked) {
			
		callback(infected, cracked);
	})
	})
}
Game.prototype.scan_nodes = function() {
		
		db.query("SELECT * FROM ip_db WHERE player_name = '" + player + "'", function(e, data) {
				for(var i in data) {
					
			db.query("SELECT COUNT(id) AS infection FROM npc_db WHERE player_name='" + player + "' AND ip_addr='" + data[i].ip_addr + "' AND type='virus'", function(e, dat) {
				//console.log(data[0].infection);
				for(var i in dat) {
					
				
				if(dat[i].infection == 0) {
					console.log('im here!'  + data[i].ip_addr);
					db.query("UPDATE ip_db SET access='0', health=' ' WHERE player_name='" + player + "' AND ip_addr='" + data[i].ip_addr + "'");
				}
			}
					
			})
		}
	})
		
			
		
}
Game.prototype.get_viruses = function(node_ip, callback) {
	
		db.query("SELECT * FROM npc_db WHERE ip_addr='" + node_ip + "'", function(e, data) {
				callback(data);
			
			
		})
		
}
Game.prototype.node_check = function(ip, callback) {
	//	var sql = db.query("SELECT * FROM ip_db WHERE player_name='" + player + "' AND access='1 AND ip_addr='" + ip + "'");
	//	sql.on('result', function(data) {
	//		callback(data);
	//	})
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



