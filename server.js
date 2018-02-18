const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log(err);
		}
	});

	next();
});

/* Render new page on Middleware */

// app.use((req, res, next) => {
// 	res.render('maintanence.hbs', {
// 		pageTitle: 'Maintanence'
// 	});
// });

hbs.registerHelper('getFullYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome ya!!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad Request'
	});
});

app.listen(3000);