const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt'); // Importar el servicio jwt

//prueba para validar que la ruta se carga de forma correcta
const pruebaUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Conexión exitosa a la ruta' }); // Indica éxito
  } catch (error) {
    res.status(500).json({ message: 'Error al acceder a la ruta', error }); // Indica error
  }
};


const register = async (req, res) => { 
  const { name, email, telefono, password } = req.body;

  try {
    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "El usuario ya existe",
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      email,
      telefono,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();

    // Generar un token JWT (si es necesario)
    const token = jwt.createToken(savedUser);

    res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: savedUser,
      token, // Si quieres devolver un token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error al registrar el usuario",
      error,
    });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios",
      error,
    });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error al obtener el usuario",
      error,
    });
  }
};

// Actualizar un usuario por ID
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, telefono, password } = req.body;

  try {
    // Hashear la contraseña si se proporciona
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, telefono, password: hashedPassword },
      { new: true } // Devuelve el usuario actualizado
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error al actualizar el usuario",
      error,
    });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error al eliminar el usuario",
      error,
    });
  }
};



// Método login
const login = async (req, res) => {
  // 1. Recoger parámetros del cuerpo de la solicitud
  const params = req.body;

  // 2. Validar los parámetros
  if (!params.email || !params.password) {
      return res.status(400).json({
          status: "error",
          message: "Falta email o password"
      });
  }

  // 3. Buscar el usuario en la base de datos por correo electrónico
  try {
      const userFound = await User.findOne({ email: params.email.toLowerCase() });

      if (!userFound) {
          return res.status(404).json({
              status: "error",
              message: "Usuario no encontrado"
          });
      }

      // 4. Comparar la contraseña proporcionada con la almacenada en la base de datos
      const pwdMatch = await bcrypt.compare(params.password, userFound.password);

      if (!pwdMatch) {
          return res.status(401).json({
              status: "error",
              message: "Contraseña incorrecta"
          });
      }

      // 5. Si la contraseña es correcta, generar un token JWT
      const token = jwt.createToken(userFound); 

      // 6. Devolver el token y los datos del usuario
      return res.status(200).json({
          status: "success",
          message: "Login correcto",
          user: {
              id: userFound._id,
              name: userFound.name,
              nick: userFound.nick,
              email: userFound.email
          },
          token: token,
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({
          status: "error",
          message: "Error al iniciar sesión",
          error: error
      });
  }
};


module.exports = {
  pruebaUser,
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};