module.exports = function(server){
  var TokenSchema = server.mongoose.Schema({
    userId: {
      type: server.mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

  TokenSchema.plugin(require('mongoose-timestamp'));
  return server.mongoose.model('Token', TokenSchema);
};
