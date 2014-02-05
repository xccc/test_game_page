var MongoClient = require('mongodb').MongoClient;
var inv = require('./class/inventory.js').inventory;
var playerLib = require('./../player/player.js');
var toolsLib = require('./../game/tools.js');
var async = require('async');
var tools = require('./tools.js');

MongoClient.connect('mongodb://localhost:27017/nodetest1', function(e, data) {
		if(!e) {
			console.log('Huston we have a problem!');
						
	}
})

exports.get_files = function(username, socket) {
	
		inv.item(username, socket);
	
}

exports.brute_force = function(username, file_name, socket) {
	var Player = new playerLib.d(username);
	
	
		
			
			var get_tool = Player.get_tool('%brute%', function(data) {
		
				console.log(data.time);	})
				
				tools.brute_forcer(username, socket);
				
		

}
