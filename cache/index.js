var Redis = require('ioredis');

module.exports = function(server){
  server.cache.redis = new Redis(server.settings.db.cache);
}
