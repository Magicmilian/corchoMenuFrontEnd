import React from "react";
import ItemCategoria from "./ItemCategoria";
import "./listas.css";

const ListaCategorias = (props) => {
  return props.listaCategorias.map((categoria) => (
    <ItemCategoria
      key={categoria.nombreCategoria}
      nombreCategoria={categoria.nombreCategoria}
      menuCategoria={categoria.menuCategoria}
      categoriaId={categoria._id}
    ></ItemCategoria>
  ));
};

export default ListaCategorias;
