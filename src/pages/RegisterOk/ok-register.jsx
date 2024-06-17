import React from "react"
import Logo from "../../assets/SmartLogo.png"
import './ok-register.css'


function Ok() {
    return (
        <div class="container-ok-regis">
            <div class="header-ok-regis">
                <div class="logo-ok-reg">
                    <img src={Logo} alt="SmartClamps Logo" />
                </div>
                <h1></h1>
                <div class="additional-image">
                </div>
            </div>
            <div class="message">
                <div class="checkmark" />

                <p>CADASTRO REALIZADO COM SUCESSO</p>
                <button className="button-ok-reg" onclick="window.history.back();">
                    Retornar
                </button>
            </div>
        </div>
    )
}

export default Ok;
