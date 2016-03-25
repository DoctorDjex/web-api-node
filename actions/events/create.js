module.exports = function(server){
  return function(req, res, next){
    var Booth = server.models.Event;
    var User = server.models.User;
    var Category = server.models.Category;

    Category.findOne({label: req.body.category}, function(errCategoryFind, category){
      req.body.startDate = new Date(req.body.startDate);
      req.body.endDate = new Date(req.body.endDate);

      if( !req.body.startDate || !req.body.endDate )
        return res.status(500).send({error: "Start date or end date is not ISO."});
      if( req.body.startDate >= req.body.endDate )
        return res.status(500).send({error: "Start date must be earlier than end date"});

      var booth  = new Booth(req.body);
      if(!category){
        var category = new Category({ label:req.body.category.toLowerCase() });
      }

      category.events.push(booth._id);
      category.save(function(error,categorySave){
        if(error)
          return res.status(500).send(categorySave);
        booth.category = category._id;
      });

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
