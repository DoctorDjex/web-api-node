var sha1 = require('sha1');
var jwt = require('jsonwebtoken');

module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;
    var Token = server.models.Token;

    var email = req.body.email;
    var password = sha1(req.body.password);

    User.findOne({
      email: email,
      password: password
    }, function(err, user){
      if (err)
        return res.status(500).send(err);
      if (!user)
        return res.status(422).send('invalid credentials');

        // Authentication succeeded.
      new Token({ // create token into the database.
        userId: user._id
      }).save(function(err, token){
        if (err)
          return res.status(500).send(err);

        var accessToken = jwt.sign({accessToken: token._id}, server.settings.TOKEN_SECRET); // encrypt the access token created from the database.
        res.send(accessToken);
      });
    });
  }
};
