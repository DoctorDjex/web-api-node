module.exports = function(server){
  return function(req, res, next){
    var Category = server.models.Category;
    var id = req.params.id;

    Category.findById(id, function(err, data){
      if (err)
        return res.status(500).send(err);
      res.send(data);
    });
  }
}
