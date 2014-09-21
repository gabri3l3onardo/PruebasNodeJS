var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'xNTqJrE6lQb6StTUPMtKrSTWB',
  'juktLieH6vFPS6tCKiyBZZ3tMTp4kJO3dygvwnj0Q6YfiBg44k',
  '1.0A',
  null,
  'HMAC-SHA1'
);

exports.enlista = function(req,res){
  oauth.get(
    'https://api.twitter.com/1.1/search/tweets.json?q=septiembre',
    '318078460-jXDEkG2VwRQUEsl4QjtDuxVYOYzpPHxHXWYllzrK',
    'pKtoS83lkP2UcRocfqnwdCczQold96JOrJ5NcoScE9So4',
    function(err,data,response){
      if(err){
        console.log('Error con Twitter: %s',err.data);
      }else{
        var datos = JSON.parse(data);
        res.render('tweets', { title: 'Tweets de Septiembre', tweets:datos.statuses});
      }
  });
};