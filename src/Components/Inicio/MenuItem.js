import React from "react";

const MenuItem = (props) => {
  return (
    <div
      className={
        (props.anchoCategoria === "Full" ? "col-6" : "col-12") +
        " d-flex flex-wrap lovaYaFont menuItem"
      }
    >
      <div className="col-8 p-0">
        <p className="nombreProducto m-0">{props.nombreProducto}</p>
      </div>
      <div className="col-4 p-0 align-self-end">
        <p className="precioProducto">{"$" + props.precioProducto}</p>
      </div>
      <hr className="hrTag m-0 p-0 col-11" />

      <div className="col-12 p-0">
        <p className="p-0 m-0 descripcionProducto">
          {props.descripcionProducto}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
