const Router = require("express").Router;
const router = new Router();
const authenticateJWT = require("../middlewares/authorizationMiddleware")
const TodoController = require("../controllers/TodoController.js")


router.post('/todos', authenticateJWT , TodoController.createTodo )
router.get('/todos' , authenticateJWT, TodoController.getAllTodos)
router.get('/todos/:id' , authenticateJWT, TodoController.getById)
router.put('/todos/:id' , authenticateJWT , TodoController.update)
router.delete('/todos/:id', authenticateJWT, TodoController.deleteById)

module.exports = router