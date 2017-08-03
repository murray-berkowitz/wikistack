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
	var page = Page.build({
		title: req.body.title,
		content:req.body.content,
		status:req.body.status
	});
	page.save()
		.then(function(){
			res.redirect('/');
		})
})

module.exports = router;