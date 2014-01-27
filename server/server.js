exports.server_time = function() {
	var sTime = new Date();
	var full_time = '';
		full_time += sTime.getFullYear();
		full_time += sTime.getMonth();
		full_time += sTime.getDay();
		full_time += sTime.getHours();
		full_time += sTime.getMinutes();
		full_time += sTime.getSeconds();
		
	return parseInt(full_time);
}
exports.get_tool = function(server_request) {
		
	var hack_settings = {};
	var hack_method = [];
	hack_settings['start_bruting'] = '%brute%';
	hack_settings['scanning'] = '%ip%';
	
	
	for(var i in hack_settings){
		
		if(server_request == i) {
			hack_method[0] = i;
			hack_method[1] = hack_settings[i];
		}
	}
		return hack_method;

	
}



