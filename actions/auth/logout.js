module.exports = function(server){
  return function(req, res, next){
    var Token = server.models.Token;
    Token.remove({ userId: req.auth.userId }, function(err, data){
      if (err)
        return res.status(500).send(err);
      res.send('logout succeeded');
    });
  }
}
