// importar dependencias

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//Definir rutas
router.get("/prueba-usuario", userController.pruebaUser);
router.post("/register", userController.register); // Agregar la ruta POST para registrar usuarios
router.get("/users", userController.getUsers); // Obtener todos los usuarios
router.get("/users/:id", userController.getUserById); // Obtener un usuario por ID
router.put("/users/:id", userController.updateUser); // Actualizar un usuario por ID
router.delete("/users/:id", userController.deleteUser); // Eliminar un usuario por ID

//Exportar router
module.exports = router;