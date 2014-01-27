var sH = require('./../Class.js');
var gameEv = require('./../game/tool_events.js');
module.exports = function(socket) {
	
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
	
