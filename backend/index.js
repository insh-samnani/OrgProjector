const express = require('express')
const connectToMongo=require('./Models/Db')

const app = express()
const port = 3000
var cors = require('cors') 

connectToMongo();
app.use(express.json())
app.use(cors())

app.use('/api/Organizations',require('./Routes/Organizations'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})