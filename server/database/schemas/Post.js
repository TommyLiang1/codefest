const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  text: { type: String },
  tags: { type: String }, // Type of advice they're looking for.
  user_visibility: { type: Boolean, default: false},
  comm_visibility: {type: Boolean, default: false},
  exp_visibility: {type: Boolean, default: false},
  completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
}, { versionKey: false });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;