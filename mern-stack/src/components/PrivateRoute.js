import React, { useState, useEffect } from "react";
import axios from "axios";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("/api/user/users");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Lista de usuarios</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono}</td>
              <td>
                <button className="btn btn-primary mr-2">
                  {/* Agregar funcionalidad para editar */}
                </button>
                <button className="btn btn-danger">
                  {/* Agregar funcionalidad para eliminar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuarios;