import React from 'react';
import SmartClampLogo from '../../assets/SmartClamp-Logo.png';
import '../Unconformities/inconformidade.css';

function Inconformidade() {
    return (
        <div className="reports-container">
            <div className="header">
                <div className="seta-volta" onClick={() => window.history.back()}>←</div>
                <div className="logo">
                    <img src={SmartClampLogo} alt="Logo" className="logo-img" />
                </div>
            </div>
            <div className="linha-separadora"></div>
            <h2 className="titulo-relatorio">Relatórios</h2>
            <div className="tabs">
                <button className="tab">Procedimentos</button>
                <button className="tab active">Inconformidades</button>
            </div>
            <div className="linha-separadora"></div>
            <div className="filtro">
                <select name="filter" id="filter">
                    <option value="">Filtrar por</option>
                </select>
            </div>
            <div className="container-tabela">
                <div className="tabela-relatorio">
                    <div className="cabecalho-tabela">
                        <span style={{ flex: 1 }}>Instituição</span>
                        <span style={{ flex: 1.5 }}>Profissional responsável</span>
                        <span style={{ flex: 2 }}>Inconformidade</span>
                        <span style={{ flex: 1 }}>Data</span>
                        <span style={{ flex: 1 }}>Situação</span>
                    </div>
                    <div className="linha-tabela">
                        <span style={{ flex: 1 }}>Z</span>
                        <span style={{ flex: 1.5 }}>Beltrano</span>
                        <span style={{ flex: 2 }}>Extravio</span>
                        <span style={{ flex: 1 }}>xx/xx/xxxx</span>
                        <span style={{ flex: 1 }} className="status erro">✖</span>
                    </div>
                    <div className="linha-tabela">
                        <span style={{ flex: 1 }}>X</span>
                        <span style={{ flex: 1.5 }}>Fulano</span>
                        <span style={{ flex: 2 }}>Atraso</span>
                        <span style={{ flex: 1 }}>xx/xx/xxxx</span>
                        <span style={{ flex: 1 }} className="status erro">✖</span>
                    </div>
                    <div className="linha-tabela">
                        <span style={{ flex: 1 }}>Y</span>
                        <span style={{ flex: 1.5 }}>Sicrano</span>
                        <span style={{ flex: 2 }}>Erro de registro</span>
                        <span style={{ flex: 1 }}>xx/xx/xxxx</span>
                        <span style={{ flex: 1 }} className="status erro">✖</span>
                    </div>
                    <div className="linha-tabela">
                        <span style={{ flex: 1 }}>W</span>
                        <span style={{ flex: 1.5 }}>Ciclano</span>
                        <span style={{ flex: 2 }}>Falta de material</span>
                        <span style={{ flex: 1 }}>xx/xx/xxxx</span>
                        <span style={{ flex: 1 }} className="status erro">✖</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inconformidade;
