module.exports = function(server){
  return function(req, res, next){
    var Booth = server.models.Event;
    var User = server.models.User;
    var Category = server.models.Category;

    Category.findOne({label: req.body.category}, function(errCategoryFind, category){
      var booth  = new Booth(req.body);

      if(!category){
        var category = new Category({label:req.body.category});
        category.save(function(errNewCategory, newCategory){
          if (errNewCategory)
            return res.status(500).send(errNewCategory);

          booth.category = newCategory._id;
          console.log("newcategory: " + newCategory);
        });

      } else {
        booth.category = category._id;
      }

      User.findById(req.auth.userId, function(errUser, user){
        if (errUser)
          return res.status(500).send(errUser);

        user.eventsOrganizer.push(booth._id);
        booth.organizer = user._id;
        booth.participants.push(user._id);
        booth.save(function(errBooth, newBooth){

          if (errBooth)
            return res.status(500).send(errBooth);

          res.send(booth);
        });
      });
    });
  }
};
