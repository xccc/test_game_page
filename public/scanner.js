function init() {
	
var dTime;
var test = io.connect('/hack');

function run_tool(x, pos) {
setInterval(function() {

    if (x > 0) {
       
        $(pos).html(x);
    } else if(x == 0) {
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
	
	for(var i in data.disable) {
		
		if(data.disable[i].match(/^sc/) != -1) {
			$('#scanner').attr("disabled","disabled");
		
		} if(data.disable[i].match(/^br/) != -1) { $('#bruter').attr("disabled","disabled"); }
		//$(data.disable).attr("disabled", "disabled");
	}
	for(var i in data.player_task) {
		
		$('#running-tasks').prepend(i + data.player_task[i]);
		run_tool(data.player_task[i], "#"+i);
		
	}
})
test.emit('show_data', {username: $('#user').val()});
test.on('tool_info', function(data) {
	$('#info').prepend(data.action);
	$('#'+data.tool).attr("disabled", "disabled");
	
	run_tool(data.time,'#'+data.action); // run counter oO

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
	console.log(ip_holder);
	$('#ip').html(ip_holder);
	
}

})


function bruter() {
	data = {}
	data.message = "start_bruting";
	//$.ajax({type: "POST",url: "/bruter",dataType:'text',data:(data), success:function(result){
	
//	$('#info').html(result);
	dTime = $('#info').text();
	var usern = $('#user').val();
	var fixed_data = {};
	fixed_data['username'] = usern;
	fixed_data['tool_name'] = data.message;
	test.emit('start_tool',{username: usern, tool_name: data.message});
	//event_sender(test, 'start_tool', fixed_data);

	

//}});

}







function scanner() {
	data = {}
	data.message = "scanning";
	
	
	// $('#info').html(result);
	dTime = parseInt($('#info').text());
	test.emit('start_tool',{username: $('#user').val(), tool_name: data.message});
	
	
	release();




}
	
$('#scanner').click(function() {
	scanner();
})

$('#bruter').click(function() {
	bruter();
})






function release() {
	
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
                       
                    }
                }, dTime*10);
               console.log(pVal);
            }








}

$(document).ready(init);
