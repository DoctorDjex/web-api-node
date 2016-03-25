module.exports = function(server){
  return function(req, res, next){
    var Event = server.models.Event;
    var User = server.models.User;
    var Category = server.models.Category;

    var booth  = new Event(req.body);
  console.log(req.body.category);
    Category.find({label: req.body.category}, function(errCategoryFind, category){
      console.log("category: " +category);
      if (!category){
        var category = new Category({label:req.body.category});
        category.save(function(errNewCategory, newCategory){

          if (errNewCategory)
            return res.status(500).send(errNewCategory);

          booth.category = newCategory._id;
          console.log("newcategory: " + newCategory);
        });

      }else{
        booth.category = category._id;
      }

      User.findById(req.auth.userId, function(errUser, user){
        if (errUser)
          return res.status(500).send(errUser);

        user.eventsOrganizer.push(booth._id);
        booth.organizer = user._id;
        console.log(booth);
        booth.save(function(errBooth, newBooth){

          if (errBooth)
            return res.status(500).send(errBooth);

          res.send(booth);

        });

      });

    });
  }
};
