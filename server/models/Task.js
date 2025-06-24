const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: String,
    completed: { type: Boolean, default: false},
    owner:  { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}

});

module.exports = mongoose.model("Task", taskSchema);