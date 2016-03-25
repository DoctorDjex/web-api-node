module.exports =  function(server){
  return function(req, res, next){
    var Event = server.models.Event;
    var query = Event.find();

    query.exec(function(err, data){
      if(err)
        return res.status(500).send(err);
        setTimeout(function(){
            res.cached.send(data);
        }, 10000);

    });
  }
};
