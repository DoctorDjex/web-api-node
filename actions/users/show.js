module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;
    var Query = User.findById(req.params.id)
        .populate("role");

    Query.exec(function(err, data){
      if (err)
        return res.status(500).send(err);
      res.send(data);
    });
  }
}
