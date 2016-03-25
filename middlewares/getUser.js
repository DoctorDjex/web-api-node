module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;

    var userQuery = User.findById(req.auth.userId)
          .populate('role');

    userQuery.exec(function(err, user){
      if(err)
        return res.status(500).send(err);
      if(!user)
        return res.status(500).send("User not authenticated");
        
      req.auth.user = user;
      next();
    });
  };
};
