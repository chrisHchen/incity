import config from '../config'

import mongoose from 'mongoose'
// Build the connection string
const dbURI = config.dbURI
// Create the database connection
const connection = mongoose.connect(dbURI)

mongoose.connection.on('connected',  () => {
  console.log('Mongoose connected to ' + dbURI +' at ' + Date());
})
mongoose.connection.on('error', (err) =>  {
  console.log('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})
process.on('SIGINT', () =>  {
  mongoose.connection.close( () =>  {
      console.log('Mongoose disconnected through app termination')
      process.exit(0) 
   })
})

export default mongoose
