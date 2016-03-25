module.exports = function(server) {
  return function(req, res, next) {
    var Role = server.models.Role;
    var id = req.params.id;

    Role.findByIdAndUpdate(id, { $set: req.body}, function (err, role) {
      if (err)
        return res.status(500).send(err);
      res.send(role);
    });
  }
};
