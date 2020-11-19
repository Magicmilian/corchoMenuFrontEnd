import React from "react";
import { Link } from "react-router-dom";
import "./listas.css";

const ItemProducto = ({ producto, huerfano, nombreCategoriaProducto, categoriaId }) => {
  return nombreCategoriaProducto ? (
    <Link
      to={`/controlcenter/menu/categoria=${categoriaId}/producto=${producto._id}`}
      className={
        (huerfano
          ? "itemProductoHuerfano"
          : producto.publicacionProducto
          ? "itemProducto"
          : "itemProductoNoPublicado") + " rounded my-2"
      }
    >
      {huerfano
        ? producto.nombreProducto
        : `${producto.nombreProducto} - ${nombreCategoriaProducto}`}
    </Link>
  ) : (
    <Link
      to={`/controlcenter/menu/categoria=${categoriaId}/producto=${producto._id}`}
      className={
        (huerfano
          ? "itemProductoHuerfano"
          : producto.publicacionProducto
          ? "itemProducto"
          : "itemProductoNoPublicado") + " rounded my-2"
      }
    >
      {producto.nombreProducto}
    </Link>
  );
};

export default ItemProducto;
