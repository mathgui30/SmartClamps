import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';
import { RiArrowGoBackFill } from "react-icons/ri";
import logo from '../../assets/logo.png';
import './recuperacao.css'

function Recuperacao() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const handleRecoverPassword = () => {
    if (email) {
      sendPasswordResetEmail(email)
        .then(() => {
          setAlert({ type: 'success', message: 'Email de recuperação enviado!' });
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        })
        .catch((error) => {
          setAlert({ type: 'error', message: 'Erro ao enviar email de recuperação: ' + error.message });
        });
    } else {
      setAlert({ type: 'error', message: 'Por favor, insira seu email para recuperar a senha!' });
    }
  };

  return (
    <>
    <div className="header-container-recuperation">
      <span className="back-arrow-recuperation" 
        onClick={() => window.history.back()}>
        <RiArrowGoBackFill />
      </span>
    </div>

    <div className='container-recuperacao'>
      <img src={logo} alt="Logo" className='logo-recuperacao' />
      <h3>Insira o e-mail de cadastro para que possamos lhe enviar o link de recuperação da sua senha.</h3>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
          <br /> 
        </label>
        <input
          type="email"
          id="email"
          className='input-email-profile'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', width: '100%', maxWidth: '300px', marginBottom: '10px' }}
        />
      </div>
      <button onClick={handleRecoverPassword} className='button-recovery-recuperation'>
        Recuperar
      </button>
      {alert && (
        <div className='alert-rec'>
          <p>{alert.message}</p>
        </div>
      )}
      <hr className='hr-recuperation' />
      <p>Não tem uma conta? <a href="/suporte" className='a-recuperation'>Toque aqui e saiba como adquirir uma.</a></p>
    </div>
    </>
  );
}

export default Recuperacao;
