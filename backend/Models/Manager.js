const mongoose=require('mongoose')
const { Schema } = mongoose;

const managerSchema = new Schema({
  userId: {
    type:Schema.Types.ObjectId,
    ref: 'User',
  },
  projectId: {
    type:Schema.Types.ObjectId,
    ref:'Project'
  }
})

const Manager = mongoose.model('Manager', managerSchema);
module.exports=Manager