module.exports = function(server){
  return function(key){
    return function(req, res, next){
      res.cached = res.cached || {};
      res.cached.send = function(data){
        server.cache.redis.del(key);
        return res.send(data);
      }

      next();
    }
  }
}
