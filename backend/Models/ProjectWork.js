const mongoose=require('mongoose');
const { Schema } = mongoose;

const projectWorkSchema = new Schema({
  organizationId: {
    type:Schema.Types.ObjectId,
    ref:'Organization'
  },
  projectId: {
    type:Schema.Types.ObjectId,
    ref:'Project'
  }
})

const ProjectWork = mongoose.model('ProjectWork', projectWorkSchema);
module.exports=ProjectWork