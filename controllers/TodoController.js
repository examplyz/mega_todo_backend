const Todo = require("../models/Todo.js")
const User = require("../models/User.js")



class TodoController {
    async createTodo(req , res) {
        try{
            const {user} = req
            const owner = await User.findById(user.id).select("-password")
            if(!user || !owner){
                res.status(401)
                return res.end("Authorization error")
            }
            const {priority , date , title} = req.body
            const todo = await Todo.create({priority , date , title , owner:owner._id})
            owner.todos.push(todo)
            await owner.save()

            if(!todo){
                res.status(520)
                res.end("Unexpected error")
            }

            res.status(200)
            res.end(JSON.stringify(todo))
        }catch (e) {
            res.status(503).json(e)
        }
    }

    async getAllTodos(req, res){
        try{
            const {user} = req
            const owner = await User.findById(user.id).populate({ path: 'todos', model: 'Todo' }).exec()
            if(!user || !owner){
                res.status(401)
                return res.end("Authorization error")
            }
            res.status(200)
            res.send(owner.todos)
        }catch (e) {
            res.status(503).json(e)
        }
    }

    async getById(req, res){
        try{
            const {user} = req
            if(!user || !req.params.id){
                res.status(400)
                res.end("No params")
            }
            const todo = await Todo.findById(req.params.id)
            if(todo.owner._id != user.id){
                res.status(403)
                res.end("No permissions")
            }
            res.status(200)
            res.json(todo)
        } catch (e) {
            res.status(503).json(e)
        }
    }

    async deleteById(req , res) {
        try{
            const {user} = req
            if(!user || !req.params.id){
                res.status(400)
                res.end("No params")
            }
            const todo = await Todo.findById(req.params.id)
            if(todo.owner._id != user.id){
                res.status(403)
                res.end("No permissions")
            }
            await Todo.deleteOne(todo)
            res.status(200)
            res.end("Success")
        }catch (e) {
            res.status(503).json(e)
        }
    }

    async update(req , res){
        try {
            const {user} = req
            if(!user || !req.params.id){
                res.status(400)
                res.end("No params")
            }
            const todo = req.body.todo


            const todoBeforeUpdate  = await Todo.findById(req.params.id)
            if(todoBeforeUpdate.owner._id != user.id){
                res.status(403)
                res.end("No permissions")
            }

            const updatedTodo = await Todo.findOneAndUpdate(req.body.id, todo , {new:true})

            return res.status(200).json(updatedTodo)

        }catch (e) {
            res.status(503).json(e)
        }


    }
}

module.exports = new TodoController()