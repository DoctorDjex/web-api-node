module.exports = function(server){
  return function(req, res, next){
    var Event = server.models.Event;
    var User = server.models.User;

    var event  = new Event(req.body);
    event.user = req.auth.userId;


    event.save(function(err, data){
      if(err) {
        return res.status(500).send(err);
      }


      User.findById(req.auth.userId, function(err, user){
          if (err)
            return res.status(500).send(err);

          user.events.push(data._id);
          user.save(function(err, instance){
            if (err)
              return res.status(500).send(err);
            res.cached.send(data);
          });

      })

    });
  }
};
