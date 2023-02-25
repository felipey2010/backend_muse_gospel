const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const routes = require("./src/routes")

//using this to define a particular directory
// const requireDir = require("require-dir")

//MIDDLEWARES
//Get JSON data from the database upon requests
app.use(express.json())
app.use(cors())

//folder to create our models
// requireDir("./src/models")

//routes file
app.use("/api", routes)

//URL of the database
const PORT = Number(process.env.PORT) || 5000

//Start the server
app.listen(PORT, function (err) {
  if (err) console.log(err)

  console.log("Now listening for request at port: " + PORT)
})

//https://www.youtube.com/watch?v=ldYcgPKEZC8
