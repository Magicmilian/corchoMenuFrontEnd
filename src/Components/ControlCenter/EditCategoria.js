import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../Template/Layout";
import "./editCategoria.css";
import ListaProductos from "./ListaProductos";

const EditCategoria = (props) => {
  const [uniqueCategory, setUniqueCategory] = useState();
  useEffect(() => {
    if (props.admin !== true) {
      props.history.push("/logincenter");
    }
    if (props.categoria === undefined) {
      setUniqueCategory(false);
    } else {
      setUniqueCategory(true);
    }
  }, [props.categoria, props.admin, props.history]);

  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro de eliminar la categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(1, 53, 31)",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, cancelar!",
      confirmButtonText: "Si, eliminar categoria!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const cabecera = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.token}`,
            },
          };
          const resultado = await fetch(
            `https://corcho-menu-backend.herokuapp.com/categorias/${props.categoria._id}`,
            cabecera
          );
          if (resultado.status !== 202) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un problema, intentalo nuevamente",
            });
            return;
          }
          props.history.push("/controlcenter/menu");
          props.setRecargarContenido(true);
          Swal.fire("Listo!", "La categoria ha sido eliminada!", "success");
        } catch (error) {
          Swal.fire(
            "Oops...",
            "Hubo un problema, intentalo nuevamente",
            "error"
          );
        }
      }
    });
  };

  return (
    <Layout>
      <div className="customContainer rounded lovaYaFont">
        {uniqueCategory ? (
          <>
            <h1 className="editCategoriaTitle text-center">
              {" "}
              {props.categoria.nombreCategoria}
            </h1>
            <div className="w-100 text-center d-flex flex-wrap justify-content-between">
              <Link
                to={`/controlcenter/menu/editcategoria=${props.categoria._id}`}
                className="btn btnCustomEdit rounded mb-2 halfButton"
              >
                Editar categoria
              </Link>
              <Link
                to={`/controlcenter/menu/categoria=${props.categoria._id}/nuevoproducto`}
                className="btn btnCustomEdit rounded mb-2 halfButton"
              >
                Agregar producto
              </Link>
              <button
                onClick={handleDelete}
                type="button"
                className="btn btnCustomEdit-2 rounded mb-2 col-12"
              >
                Eliminar categoria
              </button>
            </div>
            <div className="tituloProducto text-center">Productos</div>
          </>
        ) : (
          <>
            <h1 className="editCategoriaTitle text-center">Productos</h1>
            <Link
              to={`/controlcenter/menu/categoria=${"all"}/nuevoproducto`}
              type="submit"
              className="btn btnCustomEdit rounded mb-2 w-100"
            >
              Agregar producto
            </Link>
          </>
        )}
        <ListaProductos
          categoria={props.categoria}
          listaCategorias={props.listaCategorias}
          listaProductos={props.listaProductos}
        ></ListaProductos>
      </div>
    </Layout>
  );
};

export default withRouter(EditCategoria);
