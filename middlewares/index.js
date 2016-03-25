module.exports = function(server){
  server.middlewares = {
    bodyparser: require('body-parser').json(),
    ensureAuthenticated: require('./ensureAuthenticated')(server),
    ensureBodyFields: require('./ensureBodyFields')(server),
    is: require('./roleChecker')(server),
    getUser: require('./getUser')(server),
    cache: {
      get: require('./getCache')(server),
      del: require('./delCache')(server),
    }
  }
}
