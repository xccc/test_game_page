var mission = io.connect('/missions');
function init() {
	mission.on('mission-data', function(data) {
		$('#mission').html(data.data);
	})






}
function runTh() {
	mission.emit('new-mission',{ level: $('#wet').text() });
	
	
}


$(document).ready(init);
