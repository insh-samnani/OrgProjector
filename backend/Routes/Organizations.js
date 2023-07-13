const express = require('express');
const router = express.Router();
const Organizations = require('../Models/Organization');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
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

// router.get('/viewOrganizationProject', fetchuser, async (req, res)=>{
//     try{
//         const userId = req.user.id;
//         const notes = await Notes.find({user: userId});
//         res.json(notes);
//     }
//     catch(error){
//         console.error(error.message);
//         res.status(500).send("Some error occured");
//     }
// });

module.exports = router;