import React from "react";
import { Link } from "react-router-dom";
import "./listas.css";

const ItemCategoria = (props) => {
  return (
    <Link
      to={`/controlcenter/menu/categoria=${props.categoriaId}`}
      className="itemCategoria rounded my-2"
    >
      {props.nombreCategoria + " - " + props.menuCategoria}
    </Link>
  );
};

export default ItemCategoria;
