import React from "react";
import ItemProducto from "./ItemProducto";

const ListaProductos = (props) => {
  if (props.categoria === undefined) {
    let categoriaFiltrada = [];
    return props.listaProductos.map((producto) => {
      categoriaFiltrada = props.listaCategorias.filter(
        (categoria) => categoria._id === producto.categoriaProductoId
      );
      if (categoriaFiltrada.length > 0) {
        return (
          <ItemProducto
            key={producto._id}
            huerfano={false}
            producto={producto}
            nombreCategoriaProducto={categoriaFiltrada[0].nombreCategoria}
            categoriaId={categoriaFiltrada[0]._id}
          ></ItemProducto>
        );
      } else {
        return (
          <ItemProducto
            key={producto._id}
            huerfano={true}
            producto={producto}
            categoriaId={null}
          ></ItemProducto>
        );
      }
    });
  } else {
    return props.listaProductos.map((producto) =>
      producto.categoriaProductoId === props.categoria._id ? (
        <ItemProducto
          key={producto._id}
          huerfano={false}
          producto={producto}
          categoriaId={props.categoria._id}
        ></ItemProducto>
      ) : null
    );
  }
};

export default ListaProductos;
