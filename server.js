const express = require("express");
const app = express();
const port = 4000;
const cors = require('cors')
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://raksha:raksha123@cluster0.h9ncm.mongodb.net/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const projectSchema = new mongoose.Schema({
  projectname: String
});
const Project = mongoose.model('Project', projectSchema);


app.use(cors());
app.use(express.json());
app.post("/createproject", async (req, res) => {
  const {projectname} = req.body;
  const project = await (await Project.findOne({projectname}).exec());
    if (project){
      res.status(500);
      res.json({
        message: "Project name already exists",
      });
      return;
    }
  await Project.create({projectname});
  res.json({
    message: "success",
  });
});

app.post("/existingproject", async (req, res) => {
  const {projectname} = req.body;
  const project = await Project.findOne({projectname}).exec();
    if (!project){
      res.status(403);
      res.json({
        message: "invalid! create new project",
      });
      return;
    }
  await Project.create({projectname});
  res.json({
    message: "success",
  });
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});



