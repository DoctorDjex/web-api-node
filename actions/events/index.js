module.exports = function(server) {
  return {
    create: require('./create')(server),
    update: require('./update')(server),
    remove: require('./remove')(server),
    get: require('./get')(server),
    show: require('./show')(server)
  }
};
