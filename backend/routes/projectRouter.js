const router = require("express").Router();
const Project = require("../models/projectModel");


router.post("/create", async (req, res) => {
    try {
        let { projectName, displayProjectName } = req.body;
        if (!projectName )
        return res.status(400).json({ msg : "please enter the field!"});

        if (!displayProjectName) displayProjectName = projectName;

        const newProject = new Project({
            projectName,
            displayProjectName,
          });
          const savedProject = await newProject.save();
          res.json(savedProject);


       
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

    router.post("/exist", async (req, res) =>{
        try {
            const {projectName} = req.body;
            if (!projectName)
            return res.status(400).json({ msg: " Fields have not been entered." });

            const project = await Project.findOne({ projectName: projectName });
            if (!project)
              return res
                  .status(400)
                  .json({ msg: "No project with this name has been created." });

                  res.json({
                   
                    project: {
                      id: project._id,
                      displayProjectName: project.displayProjectName,
                      projectName:project.projectName,
                    },
                  });
        
       
        }  catch (err) {
            res.status(500).json({ error: err.message });
          }
        });


        

module.exports = router;