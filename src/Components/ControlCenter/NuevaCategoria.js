import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../Template/Layout";
import Swal from "sweetalert2";
import "./editCategoria.css";

const NuevaCategoria = (props) => {
  useEffect(() => {
    if (props.admin !== true) {
      props.history.push("/logincenter");
    }
  });
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [descripcionCategoria, setDescripcionCategoria] = useState("");
  const [menuCategoria, setMenuCategoria] = useState("");
  const [anchoCategoria, setAnchoCategoria] = useState("");
  const [posicionCategoria, setPosicionCategoria] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (
      nombreCategoria === "" ||
      menuCategoria === "" ||
      anchoCategoria === ""
    ) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    const data = {
      nombreCategoria: nombreCategoria,
      descripcionCategoria: descripcionCategoria,
      menuCategoria: menuCategoria,
      anchoCategoria: anchoCategoria,
      posicionCategoria: posicionCategoria,
    };
    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(data),
      };
      const resultado = await fetch(
        "https://corcho-menu-backend.herokuapp.com/categorias",
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
      Swal.fire("Listo!", "Se ha agregado la categoria", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema, intentalo nuevamente",
      });
    }
  };
  return (
    <Layout>
      <div className="customContainer rounded lovaYaFont">
        <h1 className="editCategoriaTitle text-center">Nueva Categoria</h1>
        {showAlert ? (
          <div className="alert alert-danger text-center" role="alert">
            Completa los campos obligatorios (*)
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryNameInput">Nombre de la Categoria*</label>
            <input
              onChange={(e) => setNombreCategoria(e.target.value)}
              className="form-control"
              id="categoryNameInput"
              type="text"
              value={nombreCategoria}
              placeholder="Ejemplo: Cervezas"
              aria-describedby="categoryNameInputHelpBlock"
            ></input>
            <small
              id="categoryNameInputHelpBlock"
              className="form-text text-muted"
            >
              El nombre de la categoria debe ser unico
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="categoryDescriptionInput">
              Descripcion de la Categoria
            </label>
            <textarea
              onChange={(e) => setDescripcionCategoria(e.target.value)}
              className="form-control"
              id="categoryDescriptionInput"
              type="text"
              value={descripcionCategoria}
              placeholder="Este campo es opcional"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="categoryMenuInput">Menu de la Categoria*</label>
            <select
              onChange={(e) => setMenuCategoria(e.target.value)}
              className="form-control"
              id="categoryMenuInput"
              value={menuCategoria}
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
            <label htmlFor="categoryWidthInput">Ancho de la Categoria*</label>
            <select
              onChange={(e) => setAnchoCategoria(e.target.value)}
              className="form-control"
              id="categoryWidthInput"
              value={anchoCategoria}
            >
              <option value={null} hidden>
                Medio o Full
              </option>
              <option value="Medio">Medio</option>
              <option value="Full">Full</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="categoryPositionInput">
              Posicion de la Categoria
            </label>
            <input
              onChange={(e) => setPosicionCategoria(e.target.value)}
              className="form-control"
              id="categoryPositionInput"
              type="number"
              value={posicionCategoria}
              placeholder="Ejemplo: 1"
              aria-describedby="categoryPositionInputHelpBlock"
            ></input>
            <small
              id="categoryPositionInputHelpBlock"
              className="form-text text-muted"
            >
              Si se deja vacio, se asignara automaticamente la posicion 999
            </small>
          </div>
          <div className="w-100 text-center">
            <button type="submit" className="btn btnCustomEdit rounded mb-2">
              Agregar categoria
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default withRouter(NuevaCategoria);
