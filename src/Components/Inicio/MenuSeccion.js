import React from "react";
import MenuItem from "./MenuItem";
import "./menuseccion.css";

const MenuSeccion = (props) => {
  return (
    <div
      className={
        (props.anchoCategoria === "Full" ? "col-12" : "col-6") +
        " d-flex flex-wrap align-items-start menuSeccion"
      }
    >
      <div className="nombreCategoria lovaYaFont align-self-start mt-1 col-12">
        {props.nombreCategoria.toUpperCase()}
      </div>
      <div className="lovaYaFont descripcionCategoria text-center mb-3 col-12">
        {props.descripcionCategoria}
      </div>
      {props.listaProductos.map((producto) =>
        producto.publicacionProducto &&
        producto.categoriaProductoId === props.categoriaId &&
        (producto.menuProducto === props.menuType ||
          producto.menuProducto === "Ambos") ? (
          <MenuItem
            anchoCategoria={props.anchoCategoria}
            nombreProducto={producto.nombreProducto}
            precioProducto={producto.precioProducto}
            descripcionProducto={producto.descripcionProducto}
            key={producto.nombreProducto + " " + props.menuType}
          ></MenuItem>
        ) : null
      )}
    </div>
  );
};

export default MenuSeccion;
