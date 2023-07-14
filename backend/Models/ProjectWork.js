const mongoose=require('mongoose');
const { Schema } = mongoose;

const projectWorkSchema = new Schema({
  workItemId: {
    type:Schema.Types.ObjectId,
    ref:'WorkItem'
  },
  projectId: {
    type:Schema.Types.ObjectId,
    ref:'Project'
  }
})

const ProjectWork = mongoose.model('ProjectWork', projectWorkSchema);
module.exports=ProjectWork