module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;

    User.find(req.params.id, function(err, data){
      if (err)
        return res.status(500).send(err);
      res.send(data);
    })
  }
}
