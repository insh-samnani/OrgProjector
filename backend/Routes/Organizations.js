const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

const Organizations = require('../Models/Organization');
const OrganizationProjects = require('../Models/OrganizationProjects');
const Projects = require('../Models/Project');

const fetchOrganization = require('../middleware/fetchorganization');

router.get('/ViewOrganization', fetchOrganization, async (req, res)=>{
    try{
        res.send(req.organizations)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.post('/CreateOrganization' , [
    body('name', 'Enter a valid Organization Name').isLength({min:2}),
    body('country', 'Enter a valid Country').isLength({min:2}),
] , async (req, res)=>{

    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        let organizations = await Organizations.findOne({name: req.body.name, country: req.body.country});
        if(organizations){ //400 - Bad request
            return res.status(400).json({success, error: "Sorry! An organization with this name already exists."});
        }
        organizations = await Organizations.create({
            name: req.body.name,
            country: req.body.country
        })

        success = true;
        res.json({ success })
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/viewOrganizationProject', fetchOrganization, async (req, res)=>{
    try{
        const orgId = req.header('organizationId');
        const organizations = req.organizations;
        // const organizationprojects = await OrganizationProjects.find({organizationId: "64af8aa16f906f8f4f6a37fc"})
        const organizationprojects = await Organizations.aggregate([
            {
              $lookup: {
                from: "organizationprojects",
                localField: "_id",
                foreignField: "organizationId",
                as: "orgProj"
              }
            },
            {
              $lookup: {
                from: "projects",
                localField: "orgProj.projectId",
                foreignField: "_id",
                as: "projects"
              }
            },
            {
                $match: {
                  _id: new mongoose.Types.ObjectId(orgId) 
                }
            },
            {
                $project: {
                    _id: 0,
                    projects: 1
                  }
            }
          ])
          
        res.json({organizations, organizationprojects});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;