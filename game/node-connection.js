var db = require('./game.js');
var server = require('./../server/mysql.js');
var async = require('async');


exports.delete_software = function(ip, id, socket) {
	var G = new db.create('dima');
	G.get_node(ip, function(data) {
		if(data.length != 0) {
			db.update("DELETE FROM npc_db WHERE id='" + id + "'");
		}
		socket.of('/upload').emit('item-deleted', {delete_item: id });
	})
	
	
}
exports.establish = function(machine, socket) {


		var G = new db.create('dima');
		var player = 'dima';
	
		async.waterfall([
			function() {
				server.query("SELECT * FROM ip_db WHERE player_name='dima' AND ip_addr='" + machine + "'", function(data) {
			
			socket.of('/upload').emit('update-node', {ip: data[0].game_value});
		})
				
			},
			
			function() { 
				G.get_connection(function(data) {
					if(data.length != 0) {
				
						db.update("UPDATE ip_db SET connected='' WHERE player_name = '" + player + "'");
				
			}db.update("UPDATE ip_db SET connected='connection' WHERE ip_addr='" + machine + "'");

			
		})
	}])
		


}


exports.update_files = function(ip_addr,uploadz,uSpeed, socket) {
	
	var G = new db.create('dima');
	
	G.get_node(ip_addr, function(data) {
			
			// show player software in red.
			var user_soft = [];
			var all_soft = [];
			var virus_list = [];
			var user_viruses = [];
			var id = 0, idx = 0;
			for(var i in data) {
				if(data[i].player_name == 'dima' &&  data[i].type != 'virus') {
				
					user_soft[id] = {};
					user_soft[id]['id'] = data[i].id;
					user_soft[id]['name'] = data[i].software;
					user_soft[id]['ip_addr'] = data[i].ip_addr;
					user_soft[id]['size'] = data[i].item_size;
					user_soft[id]['version'] = data[i].version;
					user_soft[id]['action'] = data[i].action;
				
					id++;
				}
				else if(data[i].type == 'virus' && data[i].player_name == 'dima') {
					user_viruses.push(data[i].software);
				}
				else if(data[i].type != 'virus') {
					all_soft[idx] = {};
					all_soft[idx]['id'] = data[i].id;
					all_soft[idx]['name'] = data[i].software;
					all_soft[idx]['ip_addr'] = data[i].ip_addr;
					all_soft[idx]['size'] = data[i].item_size;
					all_soft[idx]['version'] = data[i].version;
					idx++;
					
				}
				else {
					virus_list.push(data[i].software);
				}
					
			}
		
			
			
			socket.of('/upload').emit('node-connected', { user: user_soft, all: all_soft, virus: virus_list, uVirus: user_viruses, uploading: uploadz, hide_time: uSpeed });
			
		
		})	
	
	
	
	
	
	
	
	
	
}











