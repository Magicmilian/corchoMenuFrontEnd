import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import "./layout.css";

const Layout = (props) => {
  const background = {
    backgroundImage: "url(/Background.jpg)",
    backgroundRepeat: "repeat",
    backgroundSize: "300px",
    minHeight: "100vh"
  };
  return (
    <div id="pageWrapper" style={background}>
      <Header></Header>
      <div id="pageContent">{props.children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
