var jwt = require('jsonwebtoken');

module.exports = function(server){
  return function(req, res, next){
    var Token = server.models.Token;
    var token = req.headers.authorization;
    if (!token)
      return res.status(401).send('unauthorized');

    jwt.verify(token, server.settings.TOKEN_SECRET, function(err, verified){
      Token.findById(verified.accessToken, function(err, data){
          if (err)
            return res.status(500).send(err);
          if (!data)
            return res.status(401).send('invalid token');

          req.auth = req.auth  || {};
          req.auth.userId = data.userId;

          next();
      });
    });
  }
};
