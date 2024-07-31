//dependencias
const jwt = require("jsonwebtoken");
const moment = require("moment");

//clave secreta para generar token
const secret = "CLAVE_SECRETA_DEL_CURSO_proyecto_DE_LA_RED_SOCIAL_002";

// crear funcion para crear token
const createTokenJWT = (user) => {
    // 1. Crear la carga útil (payload) del token
    const payload = {
        id: user._id, // Identificador del usuario
        name: user.name, // Nombre del usuario
        // surname: user.name,  // No es necesario, ya tienes el nombre
        nick: user.nick, // Nombre de usuario
        email: user.email, // Correo electrónico del usuario
        role: user.role, // Rol del usuario (si aplica)
        image: user.image, // Imagen del usuario (si aplica)
        iat: moment().unix(), // Tiempo de emisión del token (en segundos desde la época Unix)
        exp: moment().add(30, "days").unix() // Tiempo de expiración del token (30 días desde la emisión)
    };

    // 2. Codificar la carga útil con la clave secreta
    const token = jwt.sign(payload, secret); // Utiliza jwt.sign para generar el token

    // 3. Devolver el token codificado
    return token; // Aquí se devuelve el token
};

// Exporta la función createTokenJWT
module.exports = createTokenJWT; 