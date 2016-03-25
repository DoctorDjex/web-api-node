module.exports = function(server){
    var CategorySchema = server.mongoose.Schema({
        label: {
            type: String,
            required: true
        },
        events : [{
            type:server.mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }]
    });

    CategorySchema.plugin(require('mongoose-timestamp'));

    return server.mongoose.model('Category', CategorySchema);
};