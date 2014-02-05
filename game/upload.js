var db = require('./../player/player.js');
var node = require('./../game/node-connection.js');
var Game = require('./../game/game.js');
var async = require('async');
var scanner = require('./file_scanner.js');
exports.grab_files = function(socket) {
	
	var Player = new db.d('dima');
		Player.get_inventory(function(data) {
		socket.of('/upload').emit('files-available', {files: data});
})}

exports.new_file = function(file,node_ip,f_size,username, socket) {
	var Player = new db.d('dima');
	var G = new Game.create('dima');
	var status;
	var uSpeed;
	console.log(username + 'voooooooooooooot');
		
		
		async.waterfall([
			function(callback) {
				G.check_item(node_ip, file, function(data) {
					status = data;
					callback();
				});},
			function(callback) {
	
				if(status == 2) {
					Player.net_speed(node_ip,f_size, function(host) {
						uSpeed = host;
					socket.of('/upload').emit('upload-info', {message: 'false',u_speed: host});
					})	
							callback();
				}else {
		
					socket.of('/upload').emit('upload-info', {message: 'You already have uploaded it to this machine.'});
				}},
	
		 function() {
				
					Player.upload_file(file, node_ip, function(data) {
						socket.emit('new-connection',{machine: node_ip.trim(), uploading: 'true', hide_time: uSpeed});
						
			}) 
	}]);
	
}


exports.start_tool = function(tool_type, node_ip, socket) {
	
		if(tool_type == 'antivirus') {
			console.log('dwdw');
			scanner.scan(node_ip);
		}
			
			
	
//	console.log(tool_name + node_ip + 'kuseh2da');
//
	//socket.of('/upload').emit('tool-started', { });
	










	
}
