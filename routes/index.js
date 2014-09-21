/* GET home page. */
var uno = 1;
var texto = 'Gabo';

exports.index = function(req, res){
	if(uno == 1){
		texto = 'Gab';
	}
  res.render('index', { title: texto });
};