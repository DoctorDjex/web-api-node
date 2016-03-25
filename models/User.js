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
        }
    });


    UserSchema.plugin(require('mongoose-timestamp'));
    return server.mongoose.model('User', UserSchema);
};
