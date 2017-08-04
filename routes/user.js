var router = require('express').Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/', function(req,res,next){
	models.User.findAll({}).then(function(users){
		res.render('users', {users});
	}).catch(next);
})

router.get('/:id', function(req,res,next){
	Promise.all([
		User.findAll({
			where: {id: req.params.id}
		}),
		Page.findAll({
			where: {authorId: req.params.id}
		})
	]).then(function(results){
		console.log(results[0]);
		res.render('user', {user:results[0], pages:results[1]})
	})
})


module.exports = router;