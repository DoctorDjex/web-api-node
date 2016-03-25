module.exports = function(server){
  return function(roles, modelType){
    return function(req, res, next){
      var Model = server.models[modelType];

      if( !Model )
        return res.status(500).send("Server error");

      Model.findById(req.params.id, function(errModel, data){
        if(errModel)
          return res.status(500).send(errModel);

        var authorized = false;

        roles.forEach(function(role){
          if( (role == "owner" && isOwner(data)) ||
              hasRole(role)
            ){
            authorized = true;
          }
        });

        if(!authorized)
          return res.status(401).send("Unauthorized");

        next();
      });

      function isOwner(resource){
        return JSON.stringify(resource.organizer) === JSON.stringify(req.auth.user._id);
      }

      function hasRole(role){
        console.log(role);
        console.log(req.auth.user.role.label);
        return role === req.auth.user.role.label;
      }
    };
  }
};
