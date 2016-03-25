module.exports =  function(server){
  return function(req, res, next){
    var isParticipant = false;

    req.selectedEvent.participants.forEach(function(participant, index){
      if(JSON.stringify(participant) == JSON.stringify(req.auth.user._id)){
        req.selectedEvent.participants.splice(index, 1);
        req.selectedEvent.save(function(err, booth){
          if(err)
            return res.status(500).send(err);

          isParticipant = true;
          return res.send(booth);
        });
      }
    });

    setTimeout(function(){
      if(!isParticipant)
        res.status(404).send("User not found in event");
    },1000);
  }
};
