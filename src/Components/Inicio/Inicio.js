import React, { useState } from "react";
import Layout from "../Template/Layout";
import Accordion from "./Accordion";
import Menu from "./Menu";

const Inicio = (props) => {
  const [active, setActive] = useState("");
  return (
    <Layout>
      <div className="containerInicio d-flex flex-column align-items-center justify-content-center">
        {props.loading ? (
          <div className="sk-circle">
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
          </div>
        ) : (
          <>
            <Accordion
              title={"MENU DIURNO"}
              active={active}
              setActive={setActive}
            >
              <Menu
                listaCategorias={props.listaCategorias}
                listaProductos={props.listaProductos}
                menuType={"Diurno"}
              ></Menu>
            </Accordion>
            <Accordion
              title={"MENU NOCTURNO"}
              active={active}
              setActive={setActive}
            >
              <Menu
                listaCategorias={props.listaCategorias}
                listaProductos={props.listaProductos}
                menuType={"Nocturno"}
              ></Menu>
            </Accordion>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Inicio;
