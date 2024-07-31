import logo from './logo.svg';
import './App.css';

import ListaUsuarios from "./components/ListaUsuarios";
import AgregarUsuario from "./components/AgregarUsuario";
import EditarUsuario from "./components/EditarUsuario";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/LoginFomr";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return(
    <div className="App">

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    {/* <a class="navbar-brand" href="#">Navbar</a> */}
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Lista de Usuarios</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="agregarusuario">Agregar Usuario</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="editarusuario">Editar Usuario</a>
        </li>
      </ul>    
    </div>
  </div>
</nav>




      <h1>Crud MERN Stack</h1>
      
      {/* creando rutas */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<PrivateRoute><ListaUsuarios/></PrivateRoute>}></Route>        
          <Route path='/agregarusuario' element = {<PrivateRoute><AgregarUsuario/></PrivateRoute>}></Route>
          <Route path='/editarusuario' element = {<PrivateRoute><EditarUsuario/></PrivateRoute>}></Route>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path='/register' element = {<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;