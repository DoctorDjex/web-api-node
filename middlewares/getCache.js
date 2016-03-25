module.exports = function(server){
  return function(req, res, next){
    var data = server.cache.redis.get(req.originalUrl, function(err, data){
      if (data){
        console.log('Entry found in cache: ', data);
        return res.send(JSON.parse(data));
      }

      res.cached = res.cached || {};
      res.cached.send = function(data){
        console.log('Setting entry in cache: ', data);
        server.cache.redis.set(req.originalUrl, JSON.stringify(data));
        return res.send(data);
      }

      next();
    });
  };
};
