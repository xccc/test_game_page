var connect = io.connect('/node-connection');
function con(ip) {
		connect.emit('new-connection', {machine: ip});
	    
		
}
function runmeh(software_id, npc_ip) {
connect.emit('delete-software', {npc: npc_ip, id: software_id});
	
}
connect.on('item-deleted', function(data) {
	$('.'+data.delete_item).hide();
	
})
connect.on('node-connected', function(data) {
	var file_list = '';
	for(var i in data.user) {
		//console.log(data.user[i].ip_addr);
		file_list += "<p class='" + data.user[i].id + "' style='color: #B80000;'>" +data.user[i].name + " <span  style='color: green;'><a href='#' onclick=runmeh('" + data.user[i].id + "','" + data.user[i].ip_addr + "');> DELETE</a></span></p>"
			
	}
	for(var i in data.uVirus) {
		
				file_list += "<p style='color: #B80000'>" + data.uVirus[i] + "</p>";
	}
	for(var i in data.all) {
		file_list += "<p class='" + data.all[i].id + "'>" + data.all[i].name + "<span style='color: green;'><a href='#' onclick=runmeh('" + data.all[i].id + "','" + data.all[i].ip_addr + "');> DELETE</a></span></p>"
	}
	for(var i in data.virus) {
		file_list += "<p style='color: white'>" + data.virus[i] + "</p>";
	}
	
	$('#host').html(file_list);

	
})
connect.on('update-node', function(data) {
	
	
	//////////// Makes sure that only one element has text 'Connected!'
	var classHolder = [];
	for(var x in $('span')) {
		 // get elements with number, these are the ones with classNames
		if(x.match(/[0-9]/)) {
				// show all classes
			classHolder.push($('span')[x].className);
			
		}
	}

	for(var x in classHolder) {
		
		if(classHolder[x].length != 0) {
			var LOD = $('.' +classHolder[x]).text();
				// delete element if old
			if(LOD == 'Connected!' && classHolder[x] != data.ip) {
				$('.'+classHolder[x]).html('');
				
			}
			
			
	}
	}
	
	
	//console.log($('span')[2]);
	
	
	$('.'+data.ip).html('Connected!');
	
})
	


