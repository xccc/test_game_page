
var dTime;
var test = io.connect('/hack');
function init() {
	

var errorMsg = function(msg) {
		$('#info').html(msg);
	};
		
function run_tool(x, pos) {
	setInterval(function() {

    if (x > 0) {
       
        $(pos).html(x);
    } else if(x <= 0) {
		$(pos).html('SHABANG!');
	}
    x--;
}, 1000);
}

function event_sender(event) {
	event.emit(event_name, event_holder);
}
test.on('show-task', function(data) {
	var time_holder;
	var progressStatus = function(myValue) {
			$('#progress').append(myValue);
		};
	
	for(var i in data.disable) {
		
		var antivirus = (data.disable[i].match(/^anti/)) ? progressStatus('Running task: ' + data.disable[i]) : '';
		var scanner = (data.disable[i].match(/^sc/)) ? progressStatus('<br />' +  data.disable[i]) : '';
		var bruter =  (data.disable[i].match(/^start/)) ? progressStatus('<br />' + data.disable[i]) : '';
	}	
	for(var i in data.player_task) {
		
	
		run_tool(Math.max(0, data.player_task[i]), "#"+i);

		
	}
})


test.emit('show_data', {username: $('#user').val()});
test.on('tool_info', function(data) {
	if(!data.time && !data.action && !data.tool) {
		$('#info').html(data.message);
	} else {
	$('#info').html(data.action);
	$('#'+data.tool).attr("disabled", "disabled");
	
	run_tool(data.time,'#'+data.action); // run counter oO
}

})




test.on('server_info', function(data) {
	if(data.info === false) {
		
	
	$('#bruter').attr("title", "Scan some ips first, fuckface");
	$('#bruter').attr("disabled", true);
} else { // Will you marry me dima?
	var ip_holder = [];
	for(var i in data.ip_addr) {
		ip_holder.push(data.ip_addr[i].ip + '<br />');
	}

	$('#ip').html(ip_holder);
	
}

})


function bruter() {
	data = {}
	data.message = "start_bruting";

	
	var usern = $('#user').val();
	
	test.emit('start_tool',{username: usern, tool_name: data.message});
	test.on('scanPerm', function(data) {
		
		var access = (data.ace == 'false') ? errorMsg('You are already brute forcing!') : release(30);
		
	})

}







function scanner() {
	data = {}
	data.message = "scanning";
	var usern = $('#user').val();
	test.emit('start_tool',{username: usern, tool_name: data.message});
	test.on('scanPerm', function(data) {
		
		var access = (data.ace == 'false') ? errorMsg('You are already scanning!') : release(30);
		
	})
	
}



	
$('#scanner').click(function() {
		
	
	scanner();

})

$('#bruter').click(function() {
	bruter();
})



}




function release(runTime) {
	
                var $pG = $('#progressbar').progressbar();
                var pGress = setInterval(function() {
                    var pVal = $pG.progressbar('option', 'value');
                    var pCnt = !isNaN(pVal) ? (pVal + 1) : 1;
                    if (pCnt > 100) {
                        clearInterval(pGress);
                    } else {
                        $pG.progressbar({
                            value : pCnt
                        });
                       if(pCnt == 99) {
						  
						 
					   }
                       
                    }
                }, runTime);
               
            }










$(document).ready(init);
