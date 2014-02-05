var sH = require('./../Class.js');
var gameEv = require('./../game/tool_events.js');
var missions = require('./../game/tutorial.js');
var node = require('./../game/node-connection.js');
var upload = require('./../game/upload.js');
var tasks = require('./../game/user_action.js');
var scan = require('./../game/scan.js');
module.exports = function(socket) {
		
	
		socket.of('/upload').on('connection', function(sok) {
			sok.on('show-files', function(data) {
				upload.grab_files(socket);
			})
			sok.on('file-upload', function(data) {
				upload.new_file(data.name,data.ip,data.file_s,data.username, socket);
			})
			sok.on('new-files', function(data) {
				node.update_files(data.machine, data.machine, data.machine, socket);
				
			})
			sok.on('tasks', function(data) {
				tasks.show_tasks(socket);
			
			})
			
	
		sok.on('new-connection', function(data) {
				
				node.establish(data.machine, socket);
				
				
			})
			sok.on('delete-software', function(data) {
				
				node.delete_software(data.npc,data.id, socket);
				
			})
			sok.on('start-tool', function(data) {
				upload.start_tool(data.tool_name, data.ip, socket);
			})
	})
	socket.on('new-connection', function(data) {
		
		node.update_files(data.machine.trim(),data.uploading,data.hide_time, socket);
		
	})
	
	
		
	
		socket.of('/missions').on('connection', function(sok) {
			sok.on('new-mission', function(data) {
				missions.new_mission(data.level, socket);
				
				
			})
		})
	
	
		socket.of('/hack').on('connection', function(sok) {
			sok.on('show_data', function(data) {
		
				gameEv.show_data(data.username, socket);
			
			})
			sok.on('start_tool', function(data) {
				
				gameEv.start_tool(data.username,data.tool_name, socket);
				// fuck me in the ass please
				
			})
		})
		
		socket.of('/scanner').on('connection', function(est) {
			est.on('get_list', function(data) {
				scan.get_files(data.username, socket);
				
				
				
			})
			est.on('start_file', function(data) {
				
				scan.brute_force(data.username, data.file_name, socket);
			})
		})
				
				
		

	
	
	}
	
