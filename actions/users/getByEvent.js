module.exports = function(server){
    return function(req, res, next){

        var User = server.models.User;
        var Event = server.models.Event;
        var EventID = req.params.id;
        var Query = Event.findById(EventID)
            .populate('participants');

        Query.exec(function(err, event){
            if (err)
                return res.status(500).send(err);
            res.send(event.participants);
        });

    }
}
