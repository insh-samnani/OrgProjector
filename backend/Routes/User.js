const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
const {body, validationResult} = require('express-validator');

const UserWork = require('../Models/UserWork');
const UserProjects = require('../Models/UserProject');

const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = '@insha@is@a@good@girl@';

router.post('/CreateUser' , [
    body('firstName', 'Enter a valid First Name').isLength({min:3}),
    body('lastName', 'Enter a valid Last Name').isLength({min:3}),
    body('password', 'Enter a valid Password').isLength({min:5}),
    body('email', 'Enter a valid Email').isEmail(),
] , async (req, res)=>{

    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        let user = await User.findOne({email: req.body.email});
        if(user){ 
            return res.status(400).json({success, error: "Sorry! A user with this email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash( req.body.password, salt);
        user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

});

router.post('/LoginUser' , [
    body('password', 'Password cannot be blank').exists(),
    body('email', 'Enter a valid Email').isEmail(),
] , async (req, res)=>{

    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

});

router.get('/DeleteMember/:projectId/:userId', fetchuser, [
] , async (req, res)=>{

    let success = false;

    var projectId = req.params.projectId
    var userId = req.params.userId

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        
        const ObjectId = mongoose.Types.ObjectId;

        var userproject = await UserProjects.deleteMany({userId: new ObjectId(userId), projectId: new ObjectId(projectId)});
        const userworks = await UserWork.aggregate([
            {
                $lookup: {
                  from: "workitems",
                  localField: "workItemId",
                  foreignField: "_id",
                  as: "workitems"
                }
            },
            {
              $lookup: {
                from: "projectworks",
                localField: "workitems._id",
                foreignField: "workItemId",
                as: "projectworks"
              }
            },
            {
                $match: {
                    "userId": new ObjectId(userId),
                    "projectworks.projectId": new ObjectId(projectId)
                }
            }
          ])
          
        var userwork = await UserWork.deleteMany({userId: new ObjectId(userId), workItemId: new ObjectId(userworks[0].workItemId.toString())});

        success = true;
        res.json({ success, message: "Successfully Deleted the Member" })
        
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router