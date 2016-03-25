module.exports = function(server){
  return function(roles, modelType){
    return function(req, res, next){
      var User = server.models.User;
      var Model = server.models[modelType];

      if( !Model )
        return res.status(500).send("Server error");

      var userQuery = User.findById(req.auth.userId)
            .populate('role');

      userQuery.exec(function(err, user){
        if(err)
          return res.status(500).send(err);

        Model.findById(req.params.id, function(errModel, data){
          if(errModel)
            return res.status(500).send(errModel);

          var authorized = false;

          roles.forEach(function(value){
            if( ( value == "owner" && JSON.stringify(data.user) === JSON.stringify(user._id) ) ||
                ( user.role.label == value ) ){
              authorized = true;
            }
          });

          if(!authorized)
            return res.status(401).send("Unauthorized");

          next();
        });
      });
    };
  }
};
