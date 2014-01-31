mysql = require('mysql');


var db = mysql.createConnection({
	host: 'localhost',
	user: 'mysql',
	password: '',
	database: 'pela'
	})
db.connect();

exports.query = function(query, callback) {
	db.query(query, function(e, data) {
		callback(data);
	})
}

exports.login = function(username, password, callback) {
	
	db.query("SELECT username,id FROM login WHERE username='" + username + "' AND password='" + password + "'", function(e, data) {
	
		callback(data);
	})
}
exports.findByName = function(id, callback) {
	
	db.query("SELECT * FROM login WHERE username='" + id + "'", function(e, data) {
	
		callback(data);
	})
}
