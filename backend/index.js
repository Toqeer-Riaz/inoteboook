const connectToMongo = require('./db');
const express = require('express')
const cors=require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
// Available Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/note'))
// app.use('/', require('./routes/home'))



app.listen(port, () => {
  console.log(`INoteBook listening at http://localhost:${port}`)
})