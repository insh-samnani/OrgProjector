const Organizations = require('../Models/Organization');

const fetchOrganization = async (req, res, next) => {
    try{
        const organizations = await Organizations.find({})
        req.organizations = organizations;
        next();
    }
    catch(error){
        res.status(401).send({error: "Please provide valid organization id"});
    }
}

module.exports = fetchOrganization