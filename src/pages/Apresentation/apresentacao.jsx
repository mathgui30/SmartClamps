import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import loading from '../../assets/Loading.png';
import '../Apresentation/apresentacao.css';

function Apresentacao() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="apresentacao-container-logo">
      <div className="imagem-container-logo">
        <img src={logo} alt="logo" className="imagem" />
      </div>
      <div className="imagem-container-loading">
        <img src={loading} alt="load" className="imagem2" />
      </div>
    </div>
  );
}

export default Apresentacao;
