module.exports = function(session) {


	session.get('username', function(err, reps) {
		console.log(reps.toString());
		console.log(reps);
	})


}
