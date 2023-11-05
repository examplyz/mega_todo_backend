const mongoose = require("mongoose")

const Todo = new mongoose.Schema({
    priority: {type: Number ,required:true , default: 0},
    date: {type:Number , required: false},
    isDone: {type: Boolean , required: true , default:false},
    title: {type: String , required: true},
    owner: {type: mongoose.Schema.Types.ObjectId , ref: "User"}
})

module.exports = mongoose.model('Todo' , Todo)