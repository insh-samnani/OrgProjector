const mongoose=require('mongoose')
const { Schema } = mongoose;

const userWorkSchema = new Schema({
  userId: {
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  workItemId: {
    type:Schema.Types.ObjectId,
    ref:'WorkItem'
  }
})

const UserWork = mongoose.model('UserWork', userWorkSchema);
module.exports=UserWork