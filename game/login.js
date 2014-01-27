var db = require('./../server/mysql.js');
var session = require('./../server/session.js');

exports.show_login = function(req, res) {
	res.render('login.jade');
	

}

exports.auth = function(req, res, next) {
	
		if(req.session.username) {
			return next();
		}
			res.redirect('/login');

		
	
}

exports.login = function(req, res) {
	
	var username = req.body.username.trim();
	var password = req.body.password.trim();
	// Login verification xx
	db.login(username, password, function(result) {
		if(result.length) {
			req.session.username = username;
			
			res.redirect('/');
		}else {
			res.render('login.jade', {message: 'Login failure'});
		}
	})

	
}


