const mongoose=require('mongoose')
const { Schema } = mongoose;

const workItemSchema = new Schema({
  name: {
    type:String,
    required:true
  }, 
  nature: {
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  startDate:{
    type:Date,
    default:Date.now
  }
})

const WorkItem = mongoose.model('WorkItem', workItemSchema);
module.exports=WorkItem