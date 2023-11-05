const mongoose = require("mongoose")

const User = new mongoose.Schema({
    login: {type: String , required: true},
    password: {type: String , required: true},
    name: {type: String , required: true},
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }]
})

module.exports = mongoose.model('User' , User)