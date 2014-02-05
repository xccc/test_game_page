


var uploadd = io.connect('/upload');
function init() {
	var username = $('#username').val();

}
$(document).ready(init);
uploadd.emit('tasks');
uploadd.on('show-task', function(data) {
	var tasks = '';
	for(var i in data.player_task) {
		
		tasks += i + ' and left: ' + Math.abs(data.player_task[i]);
		
		
	}
		$('#tasker').html(tasks);
})
function connected_machine() {
	
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
			if(LOD == 'Connected!') {
				return classHolder[x]; // give me the className whos value is connected.
				
			}
			
			
	}
	}
	
	
	return classHolder;	
	
}

function upload() {
	//when user hits upload button
	uploadd.emit('show-files');
	
	
}


function uploader(file_n) {

	$('#progressbar').show();
	$('#progressbar').progressbar({value: 0});
	var node_ip = $('.' + connected_machine()).prev().prev().text();
	var fire_me=0;
	uploadd.emit('file-upload',{name: file_n.value, ip: node_ip, file_s: file_n.id, uploading: 'true' });
	uploadd.on('upload-info', function(data) {
			fire_me++;	
		if(data.message == 'false') { 
			if(fire_me == 1) {
		
					
						release(data.u_speed);
				button_action('disable');
			}
	
		} else {
		$('#progressbar').hide();
		$('#upload-info').html(data.message);
		
		button_action('false');
	}
})
$('#upload-info').html('');

	
	

	
	
	
	
		
	
	


}

uploadd.on('files-available', function(data) {
	var file_holder = '';
	
	for(var i in data.files) {
		
		file_holder += "<input id=" + data.files[i].item_size + " type=button onclick=uploader(this); value=" + data.files[i].software + "></br>";
						
		
	}
	$('#show-files').html(file_holder);
})

function con(ip) {
	//alert(ip.name);
		uploadd.emit('new-connection', {machine: ip.name});
		uploadd.emit('new-files', { machine: ip.name});
	    
		
}
function runmeh(software_id) {
	var npc_ip = $('.' + connected_machine()).prev().prev().text();
uploadd.emit('delete-software', {npc: npc_ip, id: software_id});

	
}
uploadd.on('item-deleted', function(data) {
	
	 $('.'+data.delete_item).remove();
	
})
function startProgram(name) {
	var node_ip = $('.' + connected_machine()).prev().prev().text();
	uploadd.emit('start-tool', {tool_name: name, ip: node_ip});
	
	//alert(name);
}
uploadd.on('node-connected', function(data) {
	var file_list = '';
	for(var i in data.user) {
		
		var run_me = (data.user[i].action == 'run') ? "<a href='#' onclick=startProgram('" + data.user[i].name +"')>Run</a>" : '';
		
		file_list += "<p class='" + data.user[i].id + "' style='color: #B80000;'>" + data.user[i].name + " [" + data.user[i].size + " ] (v" + data.user[i].version + ") <span  style='color: green;'><a href='#' onclick=runmeh('" + data.user[i].id + "');> DELETE</a>" + run_me + "</span></p>"
			
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
	
	if(data.uploading == 'true') {
		
		setTimeout(function() {
			$('#host').html(file_list);
		}, data.hide_time*100);
	} else {
	
$('#host').html(file_list);
}
	$('#uploadButton').attr('type','button'); // show upload button

	
})


uploadd.on('update-node', function(data) {
	
	
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



