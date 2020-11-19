import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../Template/Layout";
import Swal from "sweetalert2";
import "./main.css";

const CambiarPass = (props) => {
  useEffect(() => {
    if (props.admin !== true) {
      props.history.push("/logincenter");
    }
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showLengthError, setShowLengthError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordDup, setnewPasswordDup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === "" || newPasswordDup === "") {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    if (newPasswordDup.length < 8) {
      setShowLengthError(true);
      return;
    }
    setShowLengthError(false);
    setShowLengthError(false);
    if (newPassword !== newPasswordDup) {
      setShowError(true);
      return;
    }
    setShowError(false);
    Swal.fire({
      title: "Estas seguro de cambiar la contraseña?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(1, 53, 31)",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, cancelar!",
      confirmButtonText: "Si, cambiar contraseña!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          passwordUsuario: newPasswordDup,
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
            "https://corcho-menu-backend.herokuapp.com/users/changepass",
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
          props.setToken("");
          props.history.push("/logincenter");
          Swal.fire("Listo!", "Tu contraseña ha sido actualizada", "success");
        } catch (error) {
          Swal.fire(
            "Oops...",
            "Hubo un problema, intentalo nuevamente",
            "error"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        props.history.push("/controlcenter/main");
      }
    });
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="customContainer rounded lovaYaFont"
      >
        <h1 className="editCategoriaTitle text-center">Cambiar contraseña</h1>
        {showAlert ? (
          <div className="alert alert-danger text-center" role="alert">
            Completa todos los campos!
          </div>
        ) : null}

        {showError ? (
          <div className="alert alert-danger text-center" role="alert">
            Las contraseñas ingresadas no coinciden!
          </div>
        ) : null}

        {showLengthError ? (
          <div className="alert alert-danger text-center" role="alert">
            La contraseña debe tener al menos 8 caracteres!
          </div>
        ) : null}

        <div className="form-group formSection">
          <label htmlFor="newpassInput">Nueva Contraseña</label>
          <input
            onChange={(e) => setnewPassword(e.target.value)}
            className="form-control"
            id="newpassInput"
            type="password"
            value={newPassword}
          ></input>
        </div>
        <div className="form-group formSection">
          <label htmlFor="newpassDupInput">Confirme nueva contraseña</label>
          <input
            onChange={(e) => setnewPasswordDup(e.target.value)}
            className="form-control"
            id="newpassDupInput"
            type="password"
            value={newPasswordDup}
          ></input>
        </div>
        <div className="w-100 text-center">
          <button type="submit" className="btn btnCustom rounded mb-2">
            Cambiar contraseña
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default withRouter(CambiarPass);
