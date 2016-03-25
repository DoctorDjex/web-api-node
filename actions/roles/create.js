module.exports = function(server){
  return function(req, res, next){
    var Role = server.models.Role;
    var role  = new Role(req.body);

    role.save(function(err, data){
      if(err) {
        return res.status(500).send(err);
      }
      res.send(data);
    });
  }
};
