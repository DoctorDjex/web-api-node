module.exports =  function(server){
  return function(req, res, next){
    if( req.selectedEvent.maxUsers == req.selectedEvent.participants.length )
      return res.status(500).send({error: "Event is full"})

    req.selectedEvent.participants.forEach(function(participant){
      if(JSON.stringify(participant) == JSON.stringify(req.auth.user._id))
        return res.status(500).send({error: "You are already registered in this event."});
    });

    req.selectedEvent.participants.push(req.auth.user._id);
    req.auth.user.eventsParticipant.push(req.selectedEvent._id);

    req.selectedEvent.save(function(err,booth){
      if(err)
        return res.status(500).send(err);
      res.send(booth);
    });
  }
};
