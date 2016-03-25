module.exports = function(server){
  return function(req, res, next){
    var query = server.models.User
      .findById(req.auth.userId)
      .populate('events')
      .populate('role');

      query.exec(function(err, data){
        if (err)
          return res.status(500).send(err);
        res.send(data);
      });

      
  }
}
