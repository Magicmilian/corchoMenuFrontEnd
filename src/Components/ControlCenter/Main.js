import React,{useEffect} from "react";
import { withRouter } from "react-router-dom"; 
import { Link } from "react-router-dom";
import Layout from "../Template/Layout";
import "./main.css";

const Main = (props) => {
  useEffect(() => {
    if(props.admin !== true){
      props.history.push("/logincenter");
    }
  });
  return (
    <Layout>
      <div className="customContainer rounded lovaYaFont text-center">
      <h1 className="editCategoriaTitle text-center">Centro de control</h1>
        <div className="w-100">
          <Link to="/controlcenter/menu" className="btn btnCustom rounded mb-2 w-75">
            Editar Menu
          </Link>
        </div>
        <div className="w-100">
          <Link to="/controlcenter/changepass" className="btn btnCustom rounded w-75">
            Cambiar contraseña
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Main);
