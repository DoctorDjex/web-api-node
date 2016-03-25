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
            min: 10,
            required : true
        },
        category: {
            type: server.mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required:true
        },
        organizer: {
            type: server.mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        participants : [{
            type:server.mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]

    });

    EventSchema.plugin(require('mongoose-timestamp'));

    return server.mongoose.model('Event', EventSchema);
};
