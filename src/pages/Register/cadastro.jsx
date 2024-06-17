import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";
import MUIDataTable from "mui-datatables";
import Logo from '../../assets/SmartLogo.png'
import { createTheme, ThemeProvider, TextField, Button, IconButton, Avatar, useRadioGroup } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import '../Register/cadastro.css'
import { db, auth } from '../../services/firebaseConfig.js'
import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";

const customTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
        head: {
          backgroundColor: "#F5F8FF",
          color: '#314290', // Altera a cor do texto das células do cabeçalho
          textTransform: 'none', // Impede que o texto seja convertido para maiúsculas
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#F5F8FF",
          borderLeft: "4px solid #314290",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: '#314290',
          '&:hover': {
            backgroundColor: '#FFFFFF',
            color: '#314290'
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#314290',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#314290',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#314290',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#314290',
          '&.Mui-focused': {
            color: '#314290',
          },
        },
      },
    },
  },
});



function Tabela1({ data }) {

  const columns = [
    { name: "nomeCompleto", label: "NOME" },
    { name: "conselhoDeClasse", label: "COREN" },
    { name: "especialidade", label: "CARGO" },
    { name: "dataCadastro", label: "Data de cadastro" },
  ];

  const options = {
    selectableRows: 'none',
  };

  const filteredData = data.map(item => ({
    nomeCompleto: item.nomeCompleto,
    conselhoDeClasse: item.conselhoDeClasse,
    especialidade: item.especialidade,
    dataCadastro: item.dataCadastro,
  }));

  return (
    <MUIDataTable
      title={"Profissionais Cadastrados"}
      data={filteredData}
      columns={columns}
      options={options}
    />
  );
}

function Cadastrar() {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    cpf: '',
    classCouncil: '',
    password: '',
    confirmPassword: '',
    sector: '',
    specialization: '',
  });

  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, senha, confirmarSenha } = formValues;

    if (senha !== confirmarSenha) {
      console.error("As senhas não coincidem");
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'professionals', user.uid), {
        nomeCompleto: formValues.nomeCompleto,
        email: formValues.email,
        cpf: formValues.cpf,
        conselhoDeClasse: formValues.conselhoDeClasse,
        setor: formValues.setor,
        especialidade: formValues.especialidade,
        dataCadastro: new Date().toLocaleDateString(),
      });
  
      console.log('Cadastro realizado com sucesso!');
      // Opcional: limpar os valores do formulário após o envio
      setFormValues({
        nomeCompleto: '',
        email: '',
        cpf: '',
        conselhoDeClasse: '',
        setor: '',
        especialidade: '',
        senha: '',
        confirmarSenha: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
    console.log(formValues);
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cadastro-form">
      <div className="profile-pic-container">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="profile-pic"
          type="file"
          onChange={handleProfilePicChange}
        />
        <label htmlFor="profile-pic">
          <IconButton component="span">
            {profilePic ? (
              <Avatar src={profilePic} style={{ width: 100, height: 100 }} />
            ) : (
              <Avatar style={{ width: 100, height: 100 }}>
                <PersonIcon style={{ fontSize: 50 }} />
              </Avatar>
            )}
          </IconButton>
        </label>
      </div>
      <TextField
        label="Nome Completo"
        name="nomeCompleto"
        value={formValues.nomeCompleto}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="CPF"
        name="cpf"
        value={formValues.confirmarEmail}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Coren/CRM"
        name="conselhoDeClasse"
        value={formValues.corenCrm}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Setor"
        name="setor"
        value={formValues.setor}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Especialidade"
        name="especialidade"
        value={formValues.especialidade}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Senha"
        type="password"
        name="senha"
        value={formValues.senha}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirmar Senha"
        type="password"
        name="confirmarSenha"
        value={formValues.confirmarSenha}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button className="cadastra" type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Cadastrar
      </Button>
    </form>
  );
}


function Relatorios() {
  const [showTabela, setShowTabela] = useState(1);
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'professionals'));
      const docsData = querySnapshot.docs.map(doc => doc.data());
      setCadastros(docsData);
    };

    fetchData();
  }, []);

  return (
  <>
    <div className="header-container-register">
      <Link to="/home" className="back-arrow-register">
      <RiArrowGoBackFill />
      </Link>
      <img src={Logo} alt="Logo" className="logo-register" /> 
    </div>
    
    <ThemeProvider theme={customTheme}>
      <div className="relatorios-container">
        <h1 className="title-register"> Cadastros </h1>
        <div className="buttons-register">
          <button onClick={() => setShowTabela(1)} variant="contained" className={`toggle-button-register ${showTabela === 1 ? 'active' : ''} `} style={{ }}>
            PROFISSIONAIS CADASTRADOS
          </button>
          <button onClick={() => setShowTabela(2)} variant="contained" className={`toggle-button-register ${showTabela === 2 ? 'active' : ''} `} style={{  }}>
            NOVO CADASTRO
          </button>
        </div>
        <div className='table-container'>
          {showTabela === 1 ? <Tabela1 data={cadastros} /> : <Cadastrar />}
        </div>
      </div>
    </ThemeProvider>
  </>
  );
}

export default Relatorios;
