const express = require('express')
const connectToMongo=require('./Models/Db')

const app = express()
const port = 3000

connectToMongo();
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})