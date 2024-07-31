const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true, // Nombre es requerido
  },
  email: {
    type: String,
    required: true, // Email es requerido
    unique: true, // Email debe ser único
  },
  telefono: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('User', userSchema, 'users'); 