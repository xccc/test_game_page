var player_db =  require('./../player/player.js');
var game_lib = require('./../game/game.js');
var server = require('./../server/server.js');
var async = require('async');
exports.show_data = function(username, socket) {
		var Player = new player_db.d(username);
	
	
	//////////////// When player is already running a task, oh god please fucke me
	
	
	Player.all_activities(function(data) {
		var tasks = {};
		var disable_me = [];
		for(var i in data) {
			tasks[data[i].task] = Math.max(0, parseInt(data[i].time)-server.server_time());
			
			disable_me.push(data[i].task);
			
			
		
			
		}
		for(var i in tasks) {
		console.log(i + tasks[i]);
	}
		socket.of('/hack').emit('show-task', { player_task: tasks, disable: disable_me});
	})
	
	
	
	
	
	
	
	

	Player.show_scanned(function(e, data) {
		if(e[0].id == 0) { // If there are no scanned IPs'
		socket.of('/hack').emit('server_info', { info: false});

		
	} else {
		console.log('here i am');
		Player.getList('start_bruting', function(data) {
				
		socket.of('/hack').emit('server_info', {info: true, ip_addr: data});
		
		
	})
}
	
			
		
	
})
}

exports.start_tool = function(username,tool_name, socket) {
	
	var Player = new player_db.d(username) // has to be req.user;
	var Game = new game_lib.create(username);
	var url_req = tool_name;
	var status = 0;
	var full_time;
	var bf_success;
	var tool = server.get_tool(url_req)[0]; // tool name
	var sTool = server.get_tool(url_req)[1]; // search tool
	
	
	var get_BT = Player.show_installed(sTool, function(b) { // get user brute forcer
	var shop_BT = Game.get_tools(b.software, function(brute_forcer) { // get bruter stats
	var player_lvl = Player.get_combat(function(player_lvl) { // get player level
	var bf_success = brute_forcer.success_rate; // get brute_forcer success rate, example 15% is 100/15 = 7
	var brute_time = parseInt(brute_forcer.time); // how long brute forcer will run
	var full_time = server.server_time()+brute_time; // add server time + scanning time
	var bf_success = brute_forcer.success_rate;
	

		async.waterfall([
			function(callback) {
				Player.getActivity(tool, function(playerActivity) {
					if(playerActivity.length != 0) {
						socket.of('/hack').emit('scanPerm',{ ace: 'false'});
			} 
				if(playerActivity.length == 0 && tool_name == 'scanning') {
					Player.getScanned(function(scanned) {
					
						if(scanned[0].xcheck) {
							socket.of('/hack').emit('tool_info', {message: 'All the ips have been scanned, nothing to do.'});
						
						
						} else {
							status = 1;
							socket.of('/hack').emit('tool_info', {time: brute_time, message: 'Scanning is running!', action: tool_name, tool: 'scanner'});
						
							
							callback();
					}
				})
			}
		
			if( playerActivity.length == 0 && tool_name == 'start_bruting') {
					Player.cracked_machines(function(rooted) {
						
						if(rooted[0].xcheck) {
							socket.of('/hack').emit('tool_info', {message: "You have cracked all the machines!"});
						
						} else {
							status = 1;
						socket.of('/hack').emit('tool_info', {time: brute_time, message: 'Brute forcer is running!', action: tool_name, tool: 'bruter'});
						
						callback();
					}
				})
						
		} }) }, function() {
			
						
		Player.getList(tool,function(ip) { // ips we are about to crack
				
			Player.addActivity(full_time, tool); // and activity to user dbt
			
			for(var i = 0;i < ip.length; i++) {
				var brute_perf = Math.round(Math.random()*bf_success)+1; // calculate the odds, random(1,7)
			
				if(tool == 'scanning') {
					Player.addHosts(ip[i].ip_address); // add host to user db
				} else {
					console.log(ip.length);
					if(brute_perf == 1) { // if random() is 1 then continue
				
							
						Player.addXp(Game.getXp(player_lvl));		// add xp
						Player.insert_cracked(ip[i].ip);		// add cracked machine
					}
				
	}}})}]);
					
						
				
		
	
					
		// tell player what the fuck is going on.
		
		
	}) }) })

	



	
}

