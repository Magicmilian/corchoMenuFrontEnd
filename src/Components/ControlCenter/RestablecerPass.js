import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import Layout from "../Template/Layout";

const RestablecerPass = (props) => {
  const [reKey, setReKey] = useState("");
  const [alert, setAlert] = useState(false);

  const onChange = (value) => {
    setReKey(value);
  };

  const handleClick = async () => {
    if (reKey === "" || reKey === null) {
      setAlert(true);
      return;
    } else {
      setAlert(false);
      Swal.fire({
        title: "Estas seguro de restablecer la contraseña?",
        text:
          "Se enviara al email asociado a la cuenta la nueva informacion de acceso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(1, 53, 31)",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, cancelar!",
        confirmButtonText: "Si, restablecer!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = {
            recaptchaToken: { reKey },
          };
          try {
            const cabecera = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };
            const resultado = await fetch(
              "https://corcho-menu-backend.herokuapp.com/users/restart",
              cabecera
            );
            if (resultado.status !== 201) {
              props.history.push("/logincenter");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un problema, intentalo nuevamente",
              });
              return;
            }
            props.history.push("/logincenter");
            Swal.fire("Listo!", "Se ha reestablecido la contraseña", "success");
          } catch (error) {
            props.history.push("/logincenter");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un problema, intentalo nuevamente",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          props.history.push("/logincenter");
        }
      });
    }
  };

  return (
    <Layout>
      <div className="customContainer rounded lovaYaFont">
        <h1 className="editCategoriaTitle text-center">
          Restablecer contraseña
        </h1>
        {alert ? (
          <div className="alert alert-danger text-center" role="alert">
            Completa la verificacion
          </div>
        ) : null}
        <p className="text-center">Confirma que no eres un Robot</p>
        <div className="d-flex align-items-center justify-content-center my-2">
          <ReCAPTCHA
            size="compact"
            sitekey="6LfJ5uEZAAAAAPqwd7NOEDHQ3kZrhP1orL55Rbaz"
            onChange={onChange}
          />
        </div>
        <div className="w-100 text-center">
          <button
            type="button"
            onClick={handleClick}
            className="btn btnCustom rounded mb-2"
          >
            Restablecer contraseña
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(RestablecerPass);
