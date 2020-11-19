import React,{useEffect} from "react";
import { withRouter } from "react-router-dom"; 
import { Link } from "react-router-dom";
import Layout from "../Template/Layout";
import ListaCategorias from "./ListaCategorias";
import "./main.css";

const EditMenu = (props) => {
  useEffect(() => {
    if(props.admin !== true){
      props.history.push("/logincenter");
    }
  });
  return (
    <Layout>
      <div className="customContainer rounded lovaYaFont text-center">
        <h1 className="editCategoriaTitle text-center">Menu Corcho Bar</h1>
        <div className="w-100 d-flex flex-wrap">
          <Link
            to="/controlcenter/menu/nuevacategoria"
            className="btnCustom rounded col-12"
          >
            Agregar nueva categoria
          </Link>
          <Link
            to={`/controlcenter/menu/categoria=${"all"}`}
            className="btnCustom-2 mt-2 rounded col-12"
          >
            Ver todos los productos
          </Link>
        </div>
        <div className="tituloCategorias">Categorias</div>
        <ListaCategorias
          listaCategorias={props.listaCategorias}
        ></ListaCategorias>
      </div>
    </Layout>
  );
};

export default withRouter(EditMenu);
