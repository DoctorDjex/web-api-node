module.exports = function(server){
    var EventSchema = server.mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date:{
         type: String,
         required : true
        },
        location:{
            type: String,
            required : true
        },
        maxUsers:{
            type: Number,
            required : true
        }

    });

    EventSchema.plugin(require('mongoose-timestamp'));

    return server.mongoose.model('Event', EventSchema);
};
