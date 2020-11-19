import React from "react";
import MenuSeccion from "./MenuSeccion";

const Menu = (props) => {
  return (
    <div className="d-flex flex-wrap align-items-start">
      {props.listaCategorias.map((categoria) =>
        categoria.menuCategoria === props.menuType ||
        categoria.menuCategoria === "Ambos" ? (
          <MenuSeccion
            listaProductos={props.listaProductos}
            nombreCategoria={categoria.nombreCategoria}
            anchoCategoria={categoria.anchoCategoria}
            descripcionCategoria={categoria.descripcionCategoria}
            categoriaId={categoria._id}
            menuType={props.menuType}
            key={categoria.nombreCategoria + " " + props.menuType}
          ></MenuSeccion>
        ) : null
      )}
    </div>
  );
};

export default Menu;
