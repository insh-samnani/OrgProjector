const mongoose=require('mongoose')
const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  country: {
    type:String,
    required:true
  }
})

const Organization = mongoose.model('Organization', organizationSchema);
module.exports=Organization