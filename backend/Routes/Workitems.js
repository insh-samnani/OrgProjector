const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const fs = require('fs');
const crypto = require('crypto');

const WorkItem = require('../Models/WorkItem');
const UserWork = require('../Models/UserWork');
const ProjectWork = require('../Models/ProjectWork');
const Projects = require('../Models/Project');
const Organizations = require('../Models/Organization');
const UserProjects = require('../Models/UserProject');

const fetchuser = require('../middleware/fetchuser');
const fetchorganization = require('../middleware/fetchuser');

const generateUniqueRandomNumber = () => {
    const randomBytes = crypto.randomBytes(3);
    const randomNumber = parseInt(randomBytes.toString('hex'), 16) % 100000;
    const filePath = './used-random-numbers.txt';
  
    let usedNumbers = [];
    if (fs.existsSync(filePath)) {
      usedNumbers = fs.readFileSync(filePath, 'utf8').split(',');
    }
  
    while (usedNumbers.includes(randomNumber.toString())) {
      const randomBytes = crypto.randomBytes(3);
      const randomNumber = parseInt(randomBytes.toString('hex'), 16) % 100000;
    }
  
    usedNumbers.push(randomNumber.toString());
    fs.writeFileSync(filePath, usedNumbers.join(','));
  
    return randomNumber.toString().padStart(5, '0');
}

router.post('/CreateWorkitem', fetchuser, [
    body('name', 'Enter a valid name').isLength({min:5}),
    body('nature', 'Enter a valid nature').isIn(['userstory', 'bug', 'task'])
] , async (req, res)=>{

    let success = false;

    var projectId = req.body.projectId
    var key = generateUniqueRandomNumber()

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        
        const ObjectId = mongoose.Types.ObjectId;

        let workitem = await WorkItem.create({
            key: key,
            name: req.body.name,
            nature: req.body.nature,
            state: "Started"
        })

        const workitemId = await WorkItem.find({key: key}).select('_id');
        const userId = req.user.id;

        let userwork = await UserWork.create({
            userId: new ObjectId(userId),
            workItemId: new ObjectId(workitemId[0]._id.toString())
        })

        let projectwork = await ProjectWork.create({
            projectId: new ObjectId(projectId),
            workItemId: new ObjectId(workitemId[0]._id.toString())
        })

        success = true;
        const saveWorkitem = await workitem.save();
        res.json(saveWorkitem)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/ShowProjectWorkItems/:id', fetchuser, [
] , async (req, res)=>{

    let success = false;

    var projectId = req.params.id

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        
        const ObjectId = mongoose.Types.ObjectId;

        const project = await Projects.find({_id: new ObjectId(projectId)});
        const userId = req.user.id;

        const projectworkitems = await WorkItem.aggregate([
            {
                $lookup: {
                  from: "userworks",
                  localField: "_id",
                  foreignField: "workItemId",
                  as: "userworks"
                }
            },
            {
              $lookup: {
                from: "projectworks",
                localField: "userworks.workItemId",
                foreignField: "workItemId",
                as: "ProjWork"
              }
            },
            {
              $lookup: {
                from: "projects",
                localField: "ProjWork.projectId",
                foreignField: "_id",
                as: "projects"
              }
            },
            {
                $match: {
                    "userworks.userId": new ObjectId(userId),
                    "projects._id": new ObjectId(projectId),
                    nature: { $in: ["bug", "task"] }
                }
            },
            {
                $project: {
                    projects: 0,
                    ProjWork: 0
                }
            }
          ])

        success = true;
        res.json({ success, project, projectworkitems })
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/ShowBacklog/:id', fetchuser, [
] , async (req, res)=>{

    let success = false;

    var projectId = req.params.id

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        
        const ObjectId = mongoose.Types.ObjectId;

        const project = await Projects.find({_id: new ObjectId(projectId)});
        const userId = req.user.id;

        const backlogitems = await WorkItem.aggregate([
            {
              $lookup: {
                from: "projectworks",
                localField: "_id",
                foreignField: "workItemId",
                as: "ProjWork"
              }
            },
            {
              $lookup: {
                from: "projects",
                localField: "ProjWork.projectId",
                foreignField: "_id",
                as: "projects"
              }
            },
            {
                $match: {
                    nature: "userstory",
                    "projects._id": new ObjectId(projectId)
                }
            },
            {
                $project: {
                    projects: 0,
                    ProjWork: 0
                }
            }
          ])

        success = true;
        res.json({ success, project, backlogitems })
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/ShowOrganizationWorkItems/:id', fetchuser, [
] , async (req, res)=>{

    let success = false;

    var orgId = req.params.id

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        
        const ObjectId = mongoose.Types.ObjectId;

        const organization = await Organizations.find({_id: new ObjectId(orgId)});
        const userId = req.user.id;

        const organizationworkitems = await ProjectWork.aggregate([
            {
                $lookup: {
                  from: "userprojects",
                  localField: "projectId",
                  foreignField: "projectId",
                  as: "userprojects"
                }
            },
            {
              $lookup: {
                from: "organizationprojects",
                localField: "userprojects.projectId",
                foreignField: "projectId",
                as: "organizationprojects"
              }
            },
            {
                $lookup: {
                  from: "projects",
                  localField: "organizationprojects.projectId",
                  foreignField: "_id",
                  as: "projects"
                }
            },
            {
                $lookup: {
                  from: "workitems",
                  localField: "workItemId",
                  foreignField: "_id",
                  as: "workitems"
                }
            },
            {
                $match: {
                    "userprojects.userId": new ObjectId(userId),
                    "organizationprojects.organizationId": new ObjectId(orgId)
                }
            },
            {
                $project: {
                    _id: 0,
                    workitems: 1,
                    "projects.name": 1
                }
            }
          ])

          if(!organizationworkitems){
            success = true;
            res.json({ success, message: "No workitem Due" })
          }
          else{

            success = true;
            res.json({ success, organization, organizationworkitems })
          }
        
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/DeleteWorkitem/:projectId/:workitemId', fetchuser, [
] , async (req, res)=>{

    let success = false;

    var projectId = req.params.projectId
    var workitemId = req.params.workitemId

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        
        const ObjectId = mongoose.Types.ObjectId;

        const userId = req.user.id;

        var userwork = await UserWork.deleteOne({workItemId: new ObjectId(workitemId)});
        var projectwork = await ProjectWork.deleteOne({workItemId: new ObjectId(workitemId)});
        var workitem = await WorkItem.deleteOne({_id: new ObjectId(workitemId)});

        success = true;
        res.json({ success, message: "Successfully Deleted the Workitem" })
        
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.post('/UpdateStatus', fetchuser, [
    body('state', 'Enter a valid state').isLength({min:5})
] , async (req, res)=>{

    let success = false;

    var state = req.body.state
    var workitemId = req.body.workitemId

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        
        const ObjectId = mongoose.Types.ObjectId;

        var workitemUpdated = await WorkItem.findByIdAndUpdate({ _id: new ObjectId(workitemId) }, { $set: { state: state } });          

        success = true;
        res.json({ success , message: "Updated Successfully"})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;