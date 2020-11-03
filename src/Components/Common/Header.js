import React from 'react';
import './common.css';

const Header = () => {
    return (
        <div id="header">
            <img id="headerImg" src={process.env.PUBLIC_URL + "Logo_CorchoBar.jpeg"} alt="Logo de Corcho Bar"/>
        </div>
    );
};

export default Header;