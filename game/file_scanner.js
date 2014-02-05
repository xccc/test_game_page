var db = require('./../player/player.js');
var node = require('./../game/node-connection.js');
var Game = require('./../game/game.js');
var async = require('async');
var server = require('./../server/server.js');
exports.scan = function(ip) {
	
		var G = new Game.create('dima');
		var Player = new db.d('dima');
		var results = {};
		var AV_version = 0.5;
		var scanning_time = server.server_time()+30;
		console.log(scanning_time + 'eta massive time' + server.server_time());

		//	G.check_viruses(); // skip viruses uploaded by user
		async.waterfall([
			function(callback) {
				
				G.get_viruses(ip, function(data) {
					
					for(var i in data) {
						if(data[i].player_name != 'dima' && data[i].type == 'virus' && data[i].version <= AV_version) {
					
							results[data[i].ip_addr] = data[i].id;
							
						}
					}
						 Player.addActivity(scanning_time, 'antivirus');
					
					callback();
				})
				}], function() {
						
					G.delete_viruses(results);
					
				}
			);
	
	
}


