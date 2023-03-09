const fs = require("fs")
const mongoose = require("mongoose")
const colors = require('colors')
const dotenv = require("dotenv")

dotenv.config()

// Models
const Poster = require("./models/posterModel")
const User = require("./models/userModel")

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const connecting = await mongoose.connect(process.env.MONGO_URI)
  console.log(`MongoDB connected to: ${connecting.connection.host}`)

}
connectDB()

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))
const posters = JSON.parse(fs.readFileSync(`${__dirname}/_data/posters.json`, 'utf-8'))

// Import
const importData = async () => {
  try {
    await User.create(users)
    await Poster.create(posters)

    console.log(`Data imported`.green)
    process.exit()

  } catch (err) {
    console.log(err)
  }
}
// Delete
const deleteData = async () => {
  try {
    await User.deleteMany()
    await Poster.deleteMany()

    console.log(`Data deleted from DB`.red)
    process.exit()
  } catch (err) {
    console.log(err)
  }
}


if(process.argv[2] === "-i"){
  importData()
} else if (process.argv[2] === "-d"){
  deleteData()
}
