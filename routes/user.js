/* GET users listing. */
exports.list = function(req, res){
  //res.send('respond with a resource');
  	req.getConnection(function(err,connection){
  		
  		connection.query('SELECT * FROM usuarios', function(err,rows){
  			if(err){
  				console.log('Error Selecting : %s',err);
  			}else{
  				console.log('Consulta Exitosa : %d',rows.length);
  			}
  			//res.render('index', { title: 'Usuarios', data:rows});
  			res.json(rows);
  		});

  	});
};

var opc_twitter = {
	hostname: 'https://api.twitter.com',
	path: '/1.1/search/tweets.json?q=septiembre',
	method: 'GET'
};

exports.add = function(req,res){
	var requestTw = http.request(opc_twitter,function(res1){
		res1.on('data',function(algo){
			console.log(algo);
		});
	});
	requestTw.on('error',function(e){
		console.log('Error con Twitter');
	});
	requestTw.end();
	//res.render('index', {title: 'Agregando GET', data: {}});
};

exports.salvar = function(req,res){
	req.getConnection(function(err, connection){
		var datos = {
			ID: 2,
			NOMBRE: 'Leo'
		};
		var query = connection.query("INSERT INTO usuarios set ?",datos,function(err, rows){
			if(err){
				console.log('Error Inserting : %s',err);
			}
			res.redirect('/users');
		});
	});
};

exports.getId = function(req,res){
	var id = req.params.id;
	req.getConnection(function(err,connection){
		connection.query('SELECT NOMBRE FROM usuarios WHERE ID = ?',[id],function(err,rows){
			if(err){
				console.log('Error Selecting : %s',err);
			}
			res.json(rows);
		});

	});
};