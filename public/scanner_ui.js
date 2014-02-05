var scan = io.connect('/scanner');
function bt_ui() {
	// I suck cocks late at night.
	
}
bt_ui.randomGenerator = function() {
		var max = 28;
		var min = 4;
		var string_len = Math.floor(Math.round(max-min+1)+min)
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#!#$%^&*(-+=';.<>/?\|";
		var message = '';
           for(var i = 0; i < string_len; i++) {
             
               message += possible.charAt(Math.floor(Math.random() * possible.length));
           }   return message;
	
}
bt_ui.showGenerator = function(time) {
	for(var i = 0; i < time; i++) {
 
        setTimeout(function() {
                  $('#bruter').html(bt_ui.randomGenerator()); message = ''; }, 100*i);

		}
}

bt_ui.RunTime =  function(time, speed, name) {
	setInterval(function() {
			if(time > 0) {
		
			$(name).html(time);
		} time--;
	 }, speed);
}

bt_ui.getUsername = function() {
	return $('#username').val();
}

bt_ui.runFile = function(name) {
	scan.emit('start_file', { file_name: name, username: bt_ui.getUsername()})

}

bt_ui.show_files = function() {
	
	//Displays your ip lists

	scan.on('file_listing', function(file_arr) {
		var data_holder = '';
		
		if(file_arr.file_c.length != 0) {
		for(var i in file_arr.file_c) {
			
			data_holder += "<a href='#' onclick=bt_ui.runFile('" + file_arr.file_c[i].file_name + "')>" + file_arr.file_c[i].file_name + "</a> </br>";
		}} else {
			data_holder = 'No IP lists found :(';
		}
			$('#file_listing').html(data_holder);
		
			 
			 
		
	
					 
	 })
 }
bt_ui.show_process = function () {
	
	
}
	
	
	
function init() {
		$('#file_browser').on('click', function() {
	
			scan.emit('get_list',{username: bt_ui.getUsername()});		 // get user ip lists
	})
	
bt_ui.show_files(); // display them.





scan.on('bruter', function(data) {
	var estimated_time = data.run_time; // how long the brute forcer will take
	var total_ip = data.ips_loaded; // total amount of nodes in the list
	var cracked_list = data.cracked_list; // machines we where able to crack, not that many i'm afraid:D
	var ip_list = data.full_list; // all the scanned ips
	var cracked_amount = data.cracked; // how many machines are cracke
	var estimated_time = 100;
	var max = Math.round(estimated_time/total_ip);
	var counter = 0;
	
	

	
	
		function bt_handler(x) {
			

		
			(function runMe() {
				
				var min = 1;
				var randomer = Math.round(Math.random()*(max-min+1)+min); // 
				if(counter == total_ip) $('#main-action').hide();
				counter++;
		
		
		var timer_out = setTimeout(function() {
			$('#main-action').html('Currently done: ' + counter );
			
			
			if(estimated_time >= 0) {

		if(ip_list[x] != null) {
		if(cracked_list.indexOf(ip_list[x]) == 1) {
			$('#success-brute').prepend('Cracked: <font color=green>' + ip_list[x] + "</font></br>");
			
			
		}else {
			$('#failure-brute').prepend('Failed: <font color=red>' + ip_list[x] + "</font></br>");
		
		} 
	} }
	
	
	estimated_time = estimated_time - randomer;
	runMe();
	x--;

	if(estimated_time <= 0) clearInterval(timer_out);
	

	
	
}, randomer*1000); 
}())


}
$('#activity').html('Brute forcer running time: ');
$('#main-loaded').html('Total IP loaded: ' + total_ip + '</br>');
$('#file_listing').hide();

bt_handler(total_ip);
bt_ui.RunTime(estimated_time,1000,'#timer');
bt_ui.showGenerator(estimated_time*10);

})

	





	


}

$(document).ready(init);
