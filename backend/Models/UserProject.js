const mongoose=require('mongoose')
const { Schema } = mongoose;

const userProjectSchema = new Schema({
  projectId: {
    type:Schema.Types.ObjectId,
    ref:'Project'
  },
  userId: {
    type:Schema.Types.ObjectId,
    ref:'User'
  }
})

const UserProject = mongoose.model('UserProject', userProjectSchema);
module.exports=UserProject