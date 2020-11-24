const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true},
  displayProjectName: { type: String },
});

module.exports = Project = mongoose.model("project", projectSchema);