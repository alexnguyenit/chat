var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	var tagline = "Title tagline.";

	var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];

	res.render('pages/index', {
        tagline: tagline,
        drinks: drinks
    });
});


app.get('/about', function(req, res){
	res.render('pages/about');
});

app.get('/chat', function(req, res){
	res.render('pages/chat');
});

app.get('/login', function(req, res){
	res.render('pages/login');
});

app.get('/register', function(req, res){
	res.render('pages/register');
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('chat message', function(msg){
		var data = {
			msg: msg,
			socket_id: socket.id
		};
	    io.emit('chat message',data);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});