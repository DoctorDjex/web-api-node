module.exports = function(server){
  RoleSchema = server.mongoose.Schema({
    label: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      default: 0,
    }
  });

  RoleSchema.plugin(require('mongoose-timestamp'));

  return server.mongoose.model('Role', RoleSchema);
}
