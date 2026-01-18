const express = require("express")
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()
const PORT = process.env.PORT
const authRoutes = require("./routes/auth.routes.js")


app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("DB Connected")
})
.catch((error)=>{
    console.log("Error Connecting DB", error)
})

app.use("/auth", authRoutes)


app.get("/", (req, res)=>{
    return res.status(200).json({message:`Server Running Perfectly`})
})

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})