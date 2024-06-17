import React from 'react';
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Logo from '../../assets/SmartLogo.png'
import '../HeaderContainer/HeaderContainer.css'

function HeaderContainer () {
    return (
    <div className="header-container">
      <span className="back-arrow" 
        onClick={() => window.history.back()}>
        <RiArrowGoBackFill />
      </span>
      
      <img src={Logo} alt="Logo" className="logo" /> 
      
    </div>
    )
}

export default HeaderContainer;
