import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Layout from "../Template/Layout";
import Swal from "sweetalert2";
import "./main.css";

const Login = (props) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombreUsuario === "" || passwordUsuario === "") {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    const login = {
      nombreUsuario: nombreUsuario,
      passwordUsuario: passwordUsuario,
    };
    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      };
      const resultado = await fetch(
        "https://corcho-menu-backend.herokuapp.com/users/login",
        cabecera
      );
      if (resultado.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El usuario o la contraseña son incorrectos!",
        });
        return;
      }
      const token = await resultado.json();
      props.setToken(token.access_token);
      props.setAdmin(true);
      //Redirigir a dashboard
      props.history.push("/controlcenter");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error, intentelo nuevamente",
      });
    }
  };
  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="customContainer rounded lovaYaFont"
      >
        <h1 className="editCategoriaTitle text-center">Centro de Login</h1>
        {showAlert ? (
          <div className="alert alert-danger text-center" role="alert">
            Completa todos los campos!
          </div>
        ) : null}

        <div className="form-group formSection">
          <label htmlFor="userInput">Usuario</label>
          <input
            onChange={(e) => setNombreUsuario(e.target.value)}
            className="form-control"
            id="userInput"
          ></input>
        </div>
        <div className="form-group formSection">
          <label htmlFor="passwordInput">Contraseña</label>
          <input
            onChange={(e) => setPasswordUsuario(e.target.value)}
            className="form-control"
            id="passwordInput"
            type="password"
          ></input>
        </div>
        <div className="w-100 text-center">
          <button type="submit" className="btn btnCustom rounded mb-2">
            Ingresar
          </button>
          <br />
          <Link to={`/logincenter/restablecerpass`} className="btn btnForget">
            Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default withRouter(Login);
