import React from 'react';
import './common.css';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div id="footer" className="mulishFont">
            <p className="mb-0">CORCHO &reg; {year}</p>
            <p className="mb-0">Todos los derechos reservados</p>
        </div>
    );
};

export default Footer;