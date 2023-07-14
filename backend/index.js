const express = require('express')
const connectToMongo=require('./Models/Db')
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('hex');

const app = express()
const port = 3000
var cors = require('cors') 

connectToMongo();
app.use(express.json())
app.use(cors())

app.use('/api/Home',require('./Routes/home'))
app.use('/api/User',require('./Routes/User'))
app.use('/api/Organizations',require('./Routes/Organizations'))
app.use('/api/Projects',require('./Routes/Project'))
app.use('/api/Workitems',require('./Routes/Workitems'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})