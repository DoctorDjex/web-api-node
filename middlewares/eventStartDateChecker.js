module.exports = function(server){
  return function(req, res, next){
    var date = new Date;
    var id = req.params.id;
    var Event = server.models.Event;

    Event.findOne({_id:id},function(err, booth){
      if(err)
        return res.status(500).send(err);
      if(!booth)
        return res.status(404).send({error: "Event not found"});

      var startDate = new Date(booth.startDate);

      if( startDate < date )
        return res.status(500).send({error: "Event has already begun"});

      req.selectedEvent = booth;
      next();
    });
  };
};
