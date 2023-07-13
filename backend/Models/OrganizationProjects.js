const mongoose=require('mongoose');
const { Schema } = mongoose;

const organizationProjectSchema = new Schema({
  organizationId: {
    type:Schema.Types.ObjectId,
    ref: 'Organization',
  },
  projectId: {
    type:Schema.Types.ObjectId,
    ref:'Project'
  }
})

const OrganizationProject = mongoose.model('OrganizationProject', organizationProjectSchema);
module.exports=OrganizationProject