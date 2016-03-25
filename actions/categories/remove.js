module.exports = function(server) {
  return function(req, res, next) {
    var Category = server.models.Category;
    Category.remove({label: req.params.label}, function(err, data){
      if (err)
        return res.status(500).send(err);

      res.send(data);
    })
  }
};
