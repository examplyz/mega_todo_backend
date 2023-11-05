const jwt = require("jsonwebtoken")
const SECRET = "SOME_VERY_SECRET_KEY999999999999999999999999"
const bcrypt = require("bcrypt")
const User = require("../models/User.js")

class UserController {
    async login(req, res){
        try {
            const {login , password} = req.body;
            const user = await User.findOne({login})
            if(!user){
                res.status(403)
                return res.send("User is not found")
            }
            const passwordCheck = await bcrypt.compare(password, user.password)
            if(!passwordCheck){
                res.status(404)
                return res.send("Something went wrong...")
            }
            res.status(200)
            res.setHeader('Content-Type', 'application/json');
            const token = jwt.sign({login:user.login , name:user.name , id: user._id} , SECRET , { expiresIn: 60 * 60 * 24 * 30 })
            res.end(JSON.stringify({token}))
        }catch (e) {
            console.log(e)
        }
    }

    async register(req, res){
        try {
            const {login , name , password} = req.body;
            const candidate = await User.findOne({login})
            if(candidate){ // If user with that login already exists return error
                res.status(400)
                return res.send("User already exists. Use another login!")
            }
            // Creating new user
            const hashPassword = await bcrypt.hash(password , 10)
            const user = await User.create({login , name ,password: hashPassword})
            res.status(200)
            res.setHeader('Content-Type', 'application/json');
            const token = jwt.sign({login:user.login , name:user.name , id: user._id} , SECRET , { expiresIn: 60 * 60 * 24 * 30 })
            res.end(JSON.stringify({token}))
        }catch (e){
            console.log(e)
        }
    }
}

module.exports = new UserController()