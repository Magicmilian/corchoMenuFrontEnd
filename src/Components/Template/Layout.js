import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import './layout.css';

const Layout = (props) => {
    return (
        <div id="pageWrapper">
            <div id="pageContent">
            <Header></Header>
            {props.children}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;