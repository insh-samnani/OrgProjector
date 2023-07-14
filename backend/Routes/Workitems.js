const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const {body, validationResult} = require('express-validator');
const fs = require('fs');
const crypto = require('crypto');

const WorkItem = require('../Models/WorkItem');
const UserWork = require('../Models/UserWork');
const ProjectWork = require('../Models/ProjectWork');

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
    body('nature', 'Enter a valid nature').isIn(['userstory', 'backlog', 'task'])
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
        res.json({ success })
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;