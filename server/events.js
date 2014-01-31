var sH = require('./../Class.js');
var gameEv = require('./../game/tool_events.js');
var missions = require('./../game/tutorial.js');
var node = require('./../game/node-connection.js');
module.exports = function(socket) {
	
		socket.of('/node-connection').on('connection', function(sok) {
			sok.on('new-connection', function(data) {
				
				node.establish(data.machine, socket);
				
			})
		})
		socket.of('/node-connection').on('connection', function(sok) {
			sok.on('delete-software', function(data) {
				
				node.delete_software(data.npc,data.id, socket);
				
			})
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
		

	
	
	}
	
