const mongoose = require('mongoose')

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const connecting = await mongoose.connect('mongodb://localhost:27017/postersappNEW')
  console.log(`MongoDB connected to: ${connecting.connection.host}`)

}

module.exports = connectDB