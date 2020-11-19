import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Inicio from "./Components/Inicio/Inicio";
import Login from "./Components/ControlCenter/Login";
import Main from "./Components/ControlCenter/Main";
import CambiarPass from "./Components/ControlCenter/CambiarPass";
import EditMenu from "./Components/ControlCenter/EditMenu";
import EditCategoria from "./Components/ControlCenter/EditCategoria";
import NuevaCategoria from "./Components/ControlCenter/NuevaCategoria";
import EditarCategoria from "./Components/ControlCenter/EditarCategoria";
import NuevoProducto from "./Components/ControlCenter/NuevoProducto";
import EditarProducto from "./Components/ControlCenter/EditarProducto";
import RestablecerPass from "./Components/ControlCenter/RestablecerPass";

function App() {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [recargarContenido, setRecargarContenido] = useState(true);
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (recargarContenido) {
      consultarAPI();
      setRecargarContenido(false);
    }
  }, [recargarContenido]);

  const consultarAPI = async () => {
    try {
      const consultaCategorias = await fetch(
        "https://corcho-menu-backend.herokuapp.com/categorias"
      );
      const respuestaCategorias = await consultaCategorias.json();
      if (consultaCategorias.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error, intentelo nuevamente",
        });
      }
      const categoriasOrdenadas = respuestaCategorias
        .slice()
        .sort((a, b) => (a.posicionCategoria > b.posicionCategoria ? 1 : -1));
      setListaCategorias(categoriasOrdenadas);
      const consultaProductos = await fetch("https://corcho-menu-backend.herokuapp.com/productos");
      const respuestaProductos = await consultaProductos.json();
      if (consultaProductos.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error, intentelo nuevamente",
        });
      }
      const productosOrdenados = respuestaProductos
        .slice()
        .sort((a, b) => (a.posicionProducto > b.posicionProducto ? 1 : -1));
      setListaProductos(productosOrdenados);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error, intentelo nuevamente",
      });
    } finally{
      setLoading(false);
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Inicio
            loading = {loading}
            listaCategorias={listaCategorias}
            listaProductos={listaProductos}
          ></Inicio>
        </Route>
        <Route exact path="/logincenter">
          <Login setToken={setToken} setAdmin={setAdmin}></Login>
        </Route>
        <Route exact path="/logincenter/restablecerpass">
          <RestablecerPass></RestablecerPass>
        </Route>
        <Route exact path="/controlcenter">
          <Main admin={admin}></Main>
        </Route>
        <Route exact path="/controlcenter/menu">
          <EditMenu
            token={token}
            admin={admin}
            listaCategorias={listaCategorias}
          ></EditMenu>
        </Route>
        <Route exact path="/controlcenter/menu/nuevacategoria">
          <NuevaCategoria
            token={token}
            admin={admin}
            setRecargarContenido={setRecargarContenido}
          ></NuevaCategoria>
        </Route>
        <Route
          exact
          path="/controlcenter/menu/categoria=:_id"
          render={(props) => {
            const idCategoria = props.match.params._id;
            const categoriaSeleccionada = listaCategorias.find(
              (categoria) => categoria._id === idCategoria
            );
            return (
              <EditCategoria
                setRecargarContenido={setRecargarContenido}
                categoria={categoriaSeleccionada}
                listaCategorias={listaCategorias}
                listaProductos={listaProductos}
                token={token}
                admin={admin}
              ></EditCategoria>
            );
          }}
        ></Route>
        <Route
          exact
          path="/controlcenter/menu/editcategoria=:_id"
          render={(props) => {
            const idCategoria = props.match.params._id;
            const categoriaSeleccionada = listaCategorias.find(
              (categoria) => categoria._id === idCategoria
            );
            return (
              <EditarCategoria
                setRecargarContenido={setRecargarContenido}
                categoria={categoriaSeleccionada}
                token={token}
                admin={admin}
              ></EditarCategoria>
            );
          }}
        ></Route>
        <Route
          exact
          path="/controlcenter/menu/categoria=:_id/nuevoproducto"
          render={(props) => {
            const idCategoria = props.match.params._id;
            const categoriaSeleccionada = listaCategorias.find(
              (categoria) => categoria._id === idCategoria
            );
            return (
              <NuevoProducto
                setRecargarContenido={setRecargarContenido}
                categoria={categoriaSeleccionada}
                listaCategorias={listaCategorias}
                token={token}
                admin={admin}
              ></NuevoProducto>
            );
          }}
        ></Route>
        <Route
          exact
          path="/controlcenter/menu/categoria=:_id/producto=:_productoId"
          render={(props) => {
            const idCategoria = props.match.params._id;
            const categoriaSeleccionada = listaCategorias.find(
              (categoria) => categoria._id === idCategoria
            );
            const idProducto = props.match.params._productoId;
            const productoSeleccionado = listaProductos.find(
              (producto) => producto._id === idProducto
            );
            return (
              <EditarProducto
                setRecargarContenido={setRecargarContenido}
                categoria={categoriaSeleccionada}
                producto={productoSeleccionado}
                listaCategorias={listaCategorias}
                token={token}
                admin={admin}
              ></EditarProducto>
            );
          }}
        ></Route>
        <Route exact path="/controlcenter/changepass">
          <CambiarPass
            token={token}
            setToken={setToken}
            admin={admin}
          ></CambiarPass>
        </Route>
        <Route exact path="*">
          <Inicio
            listaCategorias={listaCategorias}
            listaProductos={listaProductos}
          ></Inicio>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
