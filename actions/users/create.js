var sha1 = require('sha1');

module.exports = function(server){
  return function(req, res, next){
    req.body.password = sha1(req.body.password);

    var User = server.models.User;
    var Role = server.models.Role;

    var user = new User(req.body);
    Role.findOne({label: server.settings.DEFAULT_ROLE}, function(err, data){
      if (err)
        return res.status(500).send(err);

      user.role = data._id;
      user.save(function(err, data){
        if (err)
          return res.status(500).send(err);
        res.send(data);
      })

    });
  };
}
