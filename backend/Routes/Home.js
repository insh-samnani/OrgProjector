const express = require('express');
const router = express.Router();

const fetchOrganization = require('../middleware/fetchorganization');
const fetchuser = require('../middleware/fetchuser');

router.get('/', fetchOrganization, fetchuser, async (req, res)=>{
    try{
        res.send(req.organizations)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;