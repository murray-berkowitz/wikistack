var router = require('express').Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/', function(req,res,next){
	res.redirect('/');
})

router.get('/add', function(req,res,next){
	res.render('addpage');
})

router.post('/', function(req,res,next){
	User.findOrCreate({
		where: {name: req.body.name, email:req.body.email}
	}).then(function(results){
		var user = results[0];

		var page = Page.build({
			title: req.body.title,
			content:req.body.content,
			status:req.body.status
		});

		return page.save()
			.then(function(result){
				return result.setAuthor(user);
			})
	})
	.then(function(result) {
	  res.redirect(result.route);
	}).catch(console.error)
})

router.get('/:url', function(req,res,next){
	var url = req.params.url;
	Page.findOne({
		where: {
			urlTitle: url
		}
	})
	.then(function(result){
		res.render('wikipage', {page:result})
	})
	.catch(next);

})

module.exports = router;