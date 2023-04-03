const mongoose  = require('mongoose');

const { Schema } = mongoose;

const LogeersSchema = new Schema({
  userId: { type: String},
  email: { type: String},
  time: { type: Date, default: Date.now },
  method: { type: String},
  host:{ type: String},
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Loggers', LogeersSchema);