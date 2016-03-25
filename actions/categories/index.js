module.exports = function(server) {
  return {
    get: require('./get')(server),
    show: require('./show')(server)
  }
};
