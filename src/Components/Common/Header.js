import React from 'react';
import { Link } from "react-router-dom";
import './common.css';

const Header = () => {
    return (
        <div id="header">
        <Link to="/">
            <img id="headerImg" src={process.env.PUBLIC_URL + "/Logo_CorchoBar.jpeg"} alt="Logo de Corcho Bar"/>
            </Link>
        </div>
    );
};

export default Header;