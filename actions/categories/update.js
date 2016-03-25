module.exports = function(server) {
  return function(req, res, next) {
    var Category = server.models.Category;
    var id = req.params.id;

    Category.findByIdAndUpdate(id, { $set: req.body}, {}, function (err, todo) {
      if (err)
        return res.status(500).send(err);
      res.send(todo);
    });
  }
};
