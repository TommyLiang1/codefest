const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    user: { type: Schema.ObjectId, ref: "User", required: true },
    post: { type: Schema.ObjectId, ref: 'Post'},
    comment: { type: Schema.ObjectId, ref: 'Comment'},
    text: { type: String },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date },
  },
  { versionKey: false }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
