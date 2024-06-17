import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../Reports/relatorios.css'
import { useEffect } from 'react';
import { db } from '../../services/firebaseConfig.js'
import { collection, addDoc, deleteDoc, getDocs, doc, Timestamp } from 'firebase/firestore';
import HeaderContainer from '../../components/HeaderContainer/HeaderContainer.jsx';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';

const customTheme = createTheme({
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        color: '#314290', // Altera a cor do texto das células do cabeçalho
        textTransform: 'none', // Impede que o texto seja convertido para maiúsculas
      },
    },
  },
});

function Tabela1({data}) {

  const columns = [
    { name: "profissionalResp", label: "Profissionais Responsáveis" },
    { name: "especialidade", label: "Especialidade"  },
    { name: "situacao", label: "Situação" },
    { name: "data", label: "Data" },
  ];

  const options = {
    selectableRows: 'none',
  };

  const filteredData = data.map(item => ({
    profissionalResp: item.profissionalResp,
    especialidade: item.especialidade,
    situacao: item.situacao,
    data: item.data ? new Date(item.data.seconds * 1000).toLocaleDateString() : '',
  }));

  return (
    <MUIDataTable
      title={"Procedimentos"}
      data={filteredData}
      columns={columns}
      options={options}
    />
  );
}

function Tabela2({data, onValidate}) {

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { name: "profissionalResp", label: "Profissionais Responsáveis" },
    { name: "especialidade", label: "Especialidade"  },
    { name: "inconformidade", label: "Inconformidade"  },
    { name: "data", label:"Data"},
    { name: "situacao", label:"Situação"  },
    {
      name: "",
      filter: false,
      sort: false,
      empty: true,
      options: {
        customBodyRender: (value, tableMeta) => {
          const id = tableMeta.rowIndex;
          return (
            <div>
            <IconButton onClick={() => navigate(`/procedimento/`)}>
              <LinkIcon />
            </IconButton>
            <IconButton onClick={() => setSelectedRow(id)}>
            <CheckIcon /> {/* Ícone de validação */}
          </IconButton>
          </div>
          );
        },
      },
    },
  ];

  const filteredData2 = data.map(item => ({
    profissionalResp: item.profissionalResp,
    inconformidade: item.inconformidade,
    especialidade: item.especialidade,
    situacao: item.situacao,
    data: item.data ? new Date(item.data.seconds * 1000).toLocaleDateString() : '',
  }));

  const options = {
    selectableRows: 'none',
  };

  return (
    <>
    <MUIDataTable
      title={"Inconformidades"}
      data={filteredData2}
      columns={columns}
      options={options}
    />
    {selectedRow !== null && (
      <ModalConfirmation 
        open={selectedRow !== null}
        onClose={() => setSelectedRow(null)}
        onConfirm={() => {
          onValidate(filteredData2[selectedRow]);
          setSelectedRow(null);
        }}
      />
    )}
  </>
    
    
  );
}

function Relatorios() {
  const [showTabela, setShowTabela] = useState(1);
  const [procedimentos, setProcedimentos] = useState([])
  const [inconformidade, setInconformidade] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      const querySnapshot = await getDocs(collection(db, 'procedimentos'))
      const docsData = querySnapshot.docs.map(doc => doc.data())
      setProcedimentos(docsData)
    }
    const fetchData2 = async() => {
      const querySnapshot = await getDocs(collection(db, "inconformidades"))
      const docsData = querySnapshot.docs.map(doc => doc.data())
      setInconformidade(docsData)
    }
    fetchData2()
    fetchData()
  }, [])

  const formatDate = (date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Sao_Paulo'
    }) + ' UTC-3';
  };


  const handleValidate = async (rowData) => {
    try {


      const HOJE = Timestamp.now();

      const formattedData = {
        profissionalResp: rowData.profissionalResp,
        especialidade: rowData.especialidade, // Substitua pelo valor apropriado
        situacao: 'Validado',
        data: HOJE,
      };
      // Adiciona à coleção de procedimentos
      await addDoc(collection(db, 'procedimentos'), formattedData);
      // Remove da coleção de inconformidades
      const querySnapshot = await getDocs(collection(db, 'inconformidades'));
      const docToDelete = querySnapshot.docs.find(doc => doc.data().inconformidade === rowData.inconformidade);
      if (docToDelete) {
        await deleteDoc(doc(db, 'inconformidades', docToDelete.id));
      }
      // Atualiza os estados
      setProcedimentos([...procedimentos, formattedData]);
      setInconformidade(inconformidade.filter(item => item.inconformidade !== rowData.inconformidade));
    } catch (error) {
      console.error("Erro ao mover documento: ", error);
    }
  };

  const getMuiTheme = () => createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#FFFFFF",
          },
          head: {
            backgroundColor: "#F5F8FF",
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
    },
  });

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <HeaderContainer />
      <div className="relatorios-container">
        <h1 className='title-reports'> Relatórios </h1>
      <div className="buttons-reports">
        <button onClick={() => setShowTabela(1)} variant="contained" className={`toggle-button-reports ${showTabela === 1 ? 'active' : ''} `} style={{ marginBottom: '20px' }}>
          PROCEDIMENTOS
        </button>
        <button onClick={() => setShowTabela(2)} variant="contained" className={`toggle-button-reports ${showTabela === 2 ? 'active' : ''} `} style={{ marginBottom: '20px' }}>
          INCONFORMIDADES
        </button>
        </div>
      <div className='table-container'>
        {showTabela === 1 ? <Tabela1 data={procedimentos} /> : <Tabela2 data={inconformidade} onValidate={handleValidate}/>}
      </div>
      </div>
    </ThemeProvider>
  );
}

export default Relatorios;
