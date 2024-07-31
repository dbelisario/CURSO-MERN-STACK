import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AgregarUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/user/register", {
        name,
        email,
        telefono,
        password,
      });

      navigate("/"); // Redireccionar a la página de inicio
    } catch (error) {
      console.error("Error al registrar:", error);
      // Mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Agregar Usuario</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono:</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Agregar Usuario
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgregarUsuario;