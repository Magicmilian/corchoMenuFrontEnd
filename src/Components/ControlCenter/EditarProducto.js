import React, { useState,useEffect } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../Template/Layout";
import Swal from "sweetalert2";

const EditarProducto = (props) => {
  useEffect(() => {
    if(props.admin !== true){
      props.history.push("/logincenter");
    }
  });
  const [showAlert, setShowAlert] = useState(false);
  const [nombreProducto, setNombreProducto] = useState(
    props.producto.nombreProducto
  );
  const [descripcionProducto, setDescripcionProducto] = useState(
    props.producto.descripcionProducto
  );
  const [precioProducto, setPrecioProducto] = useState(
    props.producto.precioProducto
  );
  const initialCategoriaProductoId = props.categoria ? props.categoria._id : "";
  const [categoriaProductoId, setCategoriaProductoId] = useState(
    initialCategoriaProductoId
  );
  const [posicionProducto, setPosicionProducto] = useState(
    props.producto.posicionProducto
  );
  const [menuProducto, setMenuProducto] = useState(props.producto.menuProducto);
  const [publicacionProducto, setPublicacionProducto] = useState(
    props.producto.publicacionProducto
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (
      nombreProducto === "" ||
      precioProducto === "" ||
      categoriaProductoId === "" ||
      menuProducto === "" ||
      publicacionProducto === null
    ) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    const data = {
      nombreProducto: nombreProducto,
      descripcionProducto: descripcionProducto,
      precioProducto: precioProducto,
      categoriaProductoId: categoriaProductoId,
      posicionProducto: posicionProducto,
      menuProducto: menuProducto,
      publicacionProducto: publicacionProducto,
    };
    try {
      const cabecera = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(data),
      };
      const resultado = await fetch(
        `https://corcho-menu-backend.herokuapp.com/productos/${props.producto._id}`,
        cabecera
      );
      if (resultado.status !== 201) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema, intentalo nuevamente",
        });
        return;
      }
      props.history.push("/controlcenter/menu");
      props.setRecargarContenido(true);
      Swal.fire("Listo!", "Se ha modificado el producto", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema, intentalo nuevamente",
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro de eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(1, 53, 31)",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, cancelar!",
      confirmButtonText: "Si, eliminar producto!",
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
            `https://corcho-menu-backend.herokuapp.com/productos/${props.producto._id}`,
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
          Swal.fire("Listo!", "El producto ha sido eliminado!", "success");
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
        <h1 className="editCategoriaTitle text-center">Editar Producto</h1>
        {showAlert ? (
          <div className="alert alert-danger text-center" role="alert">
            Completa los campos obligatorios (*)
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productNameInput">Nombre del Producto*</label>
            <input
              onChange={(e) => setNombreProducto(e.target.value)}
              className="form-control"
              id="productNameInput"
              type="text"
              value={nombreProducto}
              placeholder="Ejemplo: Pizza Corcho"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="productDescriptionInput">
              Descripcion del Producto
            </label>
            <textarea
              onChange={(e) => setDescripcionProducto(e.target.value)}
              className="form-control"
              id="productDescriptionInput"
              type="text"
              value={descripcionProducto}
              placeholder="Este campo es opcional"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="productPriceInput">Precio del Producto*</label>
            <input
              onChange={(e) => setPrecioProducto(e.target.value)}
              className="form-control"
              id="productPriceInput"
              type="number"
              value={precioProducto}
              placeholder="Ejemplo: 400"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="productCategoryInput">
              Categoria del Producto*
            </label>
            <select
              onChange={(e) => setCategoriaProductoId(e.target.value)}
              className="form-control"
              id="productCategoryInput"
              value={categoriaProductoId}
            >
              <option value={null} hidden>
                Seleccionar categoria
              </option>
              {props.listaCategorias.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.nombreCategoria}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="productPositionInput">Posicion del Producto</label>
            <input
              onChange={(e) => setPosicionProducto(e.target.value)}
              className="form-control"
              id="productPositionInput"
              type="number"
              value={posicionProducto}
              placeholder="Ejemplo: 3"
              aria-describedby="productPositionInputHelpBlock"
            ></input>
            <small
              id="productPositionInputHelpBlock"
              className="form-text text-muted"
            >
              Si se deja vacio, se asignara automaticamente la posicion 999
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="productMenuInput">Menu del Producto*</label>
            <select
              onChange={(e) => setMenuProducto(e.target.value)}
              className="form-control"
              id="productMenuInput"
              value={menuProducto}
            >
              <option value={null} hidden>
                Diurno, Nocturno, o Ambos
              </option>
              <option value="Diurno">Diurno</option>
              <option value="Nocturno">Nocturno</option>
              <option value="Ambos">Ambos</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="productPublishInput">Producto publicado*</label>
            <select
              onChange={(e) => setPublicacionProducto(e.target.value)}
              className="form-control"
              id="productPublishInput"
              value={publicacionProducto}
            >
              <option value={null} hidden></option>
              <option value={false}>NO</option>
              <option value={true}>SI</option>
            </select>
          </div>
          <div className="w-100 text-center mb-2">
            <button type="submit" className="btn btnCustomEdit rounded mb-2">
              Editar producto
            </button>
          </div>
          <div className="w-100 text-center">
          <button
            type="button"
            onClick={handleDelete}
            className="btn btnCustomEdit-2 rounded mb-2"
          >
            Eliminar producto
          </button>
        </div>
        </form>
      </div>
    </Layout>
  );
};

export default withRouter(EditarProducto);
