const mongoose = require("mongoose")
const express = require("express")
const cors = require('cors')
const todoRouter = require("./routers/todoRouter.js");
const authRouter = require("./routers/authRouter.js")
const app = express()
const PORT = process.env.PORT || 5555
const DB_URL = "mongodb+srv://artemslubskiy:1234@mega-todo-claster.vuvqb22.mongodb.net/?retryWrites=true"

app.use(cors())
app.use(express.json())

app.use("/api" , todoRouter)
app.use("/api", authRouter)

async function start() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log("Server is started")
        })
    }catch (e){
        console.log(e)
    }
}

start()