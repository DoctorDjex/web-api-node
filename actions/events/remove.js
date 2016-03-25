module.exports = function(server) {
  return function(req, res, next) {
    var Event = server.models.Event;
    Event.remove({name: req.params.name}, function(err, data){
      if (err)
        return res.status(500).send(err);

      res.cached.send(data);
    })
  }
};
