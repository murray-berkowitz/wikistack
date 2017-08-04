const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});
var models = require('./models');
var routes = require('./routes');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache:true});


models.db.sync({force:true})
	.then(function(){
	 	app.listen(port, function(){
	 		console.log(`listening on port ${port}`);
	 	});
	 })
	.catch(console.error);

app.use('/', require('morgan')(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

app.get('/', function(req,res,next){
	var page = models.Page;
	page.findAll({
		attributes: ['title', 'urlTitle']
	}).then(function(result){
		res.render('index', {results:result})
	})
})

app.use(require('method-override')('_method'));
app.use(urlEncodedParser);
app.use('/', routes);
app.use(express.static('public'));
module.exports = {port};