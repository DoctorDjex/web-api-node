module.exports = function(server){
    var UserSchema = server.mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            default: 'foo'
        },
        lastName: {
            type: String,
            default: 'bar'
        },
        role: {
            type:server.mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        },
        eventsOrganizer : [{
            type:server.mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
        eventsParticipant : [{
            type:server.mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }]
    });


    UserSchema.plugin(require('mongoose-timestamp'));
    return server.mongoose.model('User', UserSchema);
};
