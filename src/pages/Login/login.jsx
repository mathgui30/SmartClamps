import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import '../Login/login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Limpa o localStorage antes de salvar novos dados
      localStorage.removeItem('user');

      // Salva os novos dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        uid: user.uid,
        // outros dados que deseja salvar
      }));


    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setAlert({ type: 'error', message: 'Erro ao fazer login.' });
    }
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          setAlert({ type: 'success', message: 'Login bem-sucedido!' });
          navigate('/home');
        } else {
          setAlert({ type: 'error', message: 'Erro ao fazer login: Usuário não encontrado.' });

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => {
        setAlert({ type: 'error', message: 'Erro ao fazer login: ' + error.message });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn(e);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} className="logo-sheet" alt="logo" />
      </div>

      <div className="form-container-login"> 
        <input
          type="email"
          placeholder="Email"
          className="input-field-email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FaUser className="icon" />

        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="input-field-password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            required
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>

        <button className="login-button" onClick={handleSignIn}>
          Acessar
        </button>

        <div className="margin">
          Esqueceu a senha?
          <Link to="/recuperacao" className="link-underline">
          Recuperar agora
          </Link> 
        </div>
      </div>
    </div>
      
      <div className="footer-text">
        Deseja adquirir uma conta?
        <Link to="/suporte" className='link-underline'>
        Contacte nosso suporte.
        </Link>
      </div>

      {/* Parte estética */}
      <div className="circle-container-login">
        <div className="circle-login"></div>
      </div>
      <div className="circle-container-2-login">
        <div className="circle-2-login"></div>
      </div>

    </div> 
  ); 
}

export default LoginForm;
