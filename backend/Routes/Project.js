const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const {body, validationResult} = require('express-validator');
const crypto = require('crypto');
const fs = require('fs');
const nodemailer = require('nodemailer');

const Organizations = require('../Models/Organization');
const OrganizationProjects = require('../Models/OrganizationProjects');
const UserProject = require('../Models/UserProject');
const Projects = require('../Models/Project');
const Managers = require('../Models/Manager');
const Users = require('../Models/User');

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

router.post('/CreateProject/:organizationId' , fetchuser, [
    body('name', 'Enter a valid Project Name').isLength({min:3}),
] , async (req, res)=>{

    let success = false;
    var key = generateUniqueRandomNumber()

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        const ObjectId = mongoose.Types.ObjectId;

        let project = await Projects.create({
            name: req.body.name,
            key: key
        })

        const projectId = await Projects.find({key: key}).select('_id');
        const organizationId = req.params.organizationId;
        let OrganiationProject = await OrganizationProjects.create({
            projectId: new ObjectId(projectId[0]._id.toString()),
            organizationId: new ObjectId(organizationId)
        })

        const userId = req.user.id
        let userProject = await UserProject.create({
            projectId: new ObjectId(projectId[0]._id.toString()),
            userId: new ObjectId(userId),
        })

        let managerProject = await Managers.create({
            projectId: new ObjectId(projectId[0]._id.toString()),
            userId: new ObjectId(userId),
        })

        success = true;
        res.json({ success })
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.post('/JoinProject' , fetchorganization, fetchuser, [
    body('key', 'Enter a valid Key').isLength({min:5}),
] , async (req, res)=>{

    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        const organizations = req.organizations;

        const ObjectId = mongoose.Types.ObjectId;

        const key = req.body.key;
        const projectId = await Projects.find({key: key}).select('_id');

        if(projectId.length === 0){
            res.json({ success, message: "No Project With This Key" })
        }
        else{
            const userId = req.user.id

            const checkExist = await UserProject.find({userId: new ObjectId(userId), projectId: new ObjectId(projectId[0]._id.toString())})
            if(checkExist.length > 0){
                res.json({message: "Already Joined"})
            }
            else{
                let userProject = await UserProject.create({
                    projectId: new ObjectId(projectId[0]._id.toString()),
                    userId: new ObjectId(userId),
                })
        
                success = true;
                res.json({ success, organizations })
        }
        }
        
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/ViewProjectMembers/:id', fetchuser, [
] , async (req, res)=>{

    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{

        const ObjectId = mongoose.Types.ObjectId;

        const projectId = req.params.id;
        const project = await Projects.find({_id: new ObjectId(projectId)})
        
        const projectmembers = await Projects.aggregate([
            {
              $lookup: {
                from: "userprojects",
                localField: "_id",
                foreignField: "projectId",
                as: "ProjMem"
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "ProjMem.userId",
                foreignField: "_id",
                as: "users"
              }
            },
            {
                $match: {
                  _id: new mongoose.Types.ObjectId(projectId) 
                }
            },
            {
                $project: {
                    _id: 0,
                    users: 1
                }
            }
          ])

          const managers = await Managers.find({userId: new mongoose.Types.ObjectId(req.user.id), projectId: new mongoose.Types.ObjectId(projectId)})
          if(managers){
            role = "manager"
          }
          else{
            role = "member"
          }

          res.json({project, projectmembers, role});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.post('/InviteMember', fetchuser, [
    body('email', 'Enter a valid Email').isEmail(),
] , async (req, res)=>{

    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        const email = req.body.email

        var emailCheck = await Users.find({email: email});

        if(emailCheck.length === 0){
            res.json({success, message: "Email Not Exist"});
        }
        else{
            const projectId = req.body.projectId

            const ObjectId = mongoose.Types.ObjectId;

            var key = await Projects.find({_id: projectId}).select('key');
            const userId = req.user.id

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'advancetourguides@gmail.com',
                pass: 'crbvfzyiabzawftb'
                }
            });
            var mailOptions = {
                from: 'advancetourguides@gmail.com',
                to: `${email}`,
                subject: 'PROJECT INVITATION',
                text: `Please join the project having project key: ${key[0].key}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if(error) {
                    console.log(error);
                } 
                else {
                    success = true
                    res.json({success, message: "Emailed Successfully"});
                }
            });
        }
        
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;