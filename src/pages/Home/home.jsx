import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { FaBook, FaFileAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/SmartLogo.png'
import '../Home/home.css'


function MainMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {

        navigate('/login');
      })
      .catch((error) => {

        console.error('Erro ao fazer logout:', error);
      });
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <>
      <div className="header-container-home">
        <div className="logo-icon-container-home">
          <img src={Logo} alt="Logo" className="logo-home" />
          <div className="profile-icon-home" onClick= {handleProfile}>
            <Avatar />
          </div>
        </div>

        <div className="lineHome" />
      
        <button className="logout-button" onClick={handleLogout}><FaSignOutAlt />Sair</button>
      </div>

        <div className="buttons-container">
          <Link to="/cadastro">
            <button className="button-home">
              <FaFileAlt />  Cadastro
            </button>
          </Link>

          <Link to="/relatorios">
            <button className="button-home">
              <FaBook /> Relatórios
            </button>
          </Link>

          <p className="screen-instructions">Sem saber para onde ir? Acesse</p>
          <Link to="/tutorial">
            <button className="button-home">
              <FaQuestionCircle /> Tutoriais
            </button>
          </Link>
        </div>

        <div className="support-link">
            <p className="screen-instructions"> Contactar </p>
          <Link to="/suporte" className='link-underline-home'>
            suporte especializado. 👈🏼
          </Link>
        </div>
      
      <footer className="footer-home">
        <span className="span-home">SmartClamps</span>
      </footer>

      {/* Parte estética */}
      <div className='circle-container-home'>
        <div className='circle'></div>
      </div>
      <div className='circle-container-2-home'>
        <div className='circle-2'></div>
      </div>
    </>
  );
}

export default MainMenu;
