var db = require('./../../server/mysql.js');

var inv =  {
	
	item: function(username, socket) {
		var items = [];
		db.query("SELECT file_name FROM inventory WHERE user='" + username + "' AND type='ip_list'", function(data) {
			
			if(data.length != 0) {
				
				
				for(var i in data) {
					items.push(data[i]);
				} }
				console.log(items + 'how');
				socket.of('/scanner').emit('file_listing',{ file_c: items});
	})
}
}

exports.inventory = inv;
