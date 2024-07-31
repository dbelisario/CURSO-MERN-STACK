import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UsuarioIndividual() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`/api/user/users/${id}`);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUsuario();
  }, [id]);

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Usuario Individual</h2>
      <p>Nombre: {usuario.name}</p>
      <p>Email: {usuario.email}</p>
      <p>Teléfono: {usuario.telefono}</p>
    </div>
  );
}

export default UsuarioIndividual;