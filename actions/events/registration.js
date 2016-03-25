module.exports =  function(server){
  return function(req, res, next){
    var id = req.params.id;
    var Event = server.models.Event;

    Event.findById(id,function(err, booth){
      if(err)
        return res.status(500).send(err);

      booth.participants.push(req.auth.user._id);
      req.auth.user.eventsParticipant.push(booth._id);

      res.send(booth);
    });
  }
};
