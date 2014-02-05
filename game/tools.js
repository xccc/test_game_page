var MongoClient = require('mongodb').MongoClient;
var playerLib = require('./../player/player.js');


exports.brute_forcer = function(username, socket) {
	var Player = new playerLib.d('dima');
	
	MongoClient.connect('mongodb://localhost:27017/nodetest1', function(e, connection) {
	if(!e) {
		console.log('Connection established!');
	}

var db = connection.collection('ip_list1');
var storeIP = [];
var ip_list = [];


	db.find().toArray(function(e, val) {
	
			for(var i in val) {
				ip_list.push(val[i].ip_addr); // store ips for client ;)
				var getRandom = Math.round(Math.random()*6)+1; // ex 1 out of seben
				
					if(getRandom == 1 && val[i].ip_addr != undefined) {
						Player.insert_cracked(val[i].ip_addr); // insert cracked machine into database.
						storeIP.push(val[i].ip_addr);
				
					}} 
					
					Player.addActivity(i*30, 'cracking'); // store activity, i*30 is time
					socket.of('/scanner').emit('bruter', {run_time: i*30, ips_loaded: i, cracked_list: storeIP, full_list: ip_list, cracked: storeIP.length });
				})
					
		
		})
		
		
	
	
	
}
