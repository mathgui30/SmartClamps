import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../Tutorial/tutorial.css'
import HeaderContainer from '../../components/HeaderContainer/HeaderContainer';
import Footer from '../../components/Footer/Footer';


function YouTubeVideo ({ videoId, title, description }) {
  return (
    <div className="video-card">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

  function Tutoriais() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([
    {
      videoId: "UkdpRw4ZG8A",
      title: "Instrumentação Cirúrgica",
      description: "Uma breve abordagem introdutória"
    },
    {
      videoId: "rRURsXBfRpk",
      title: "Instrumentação Cirúrgica",
      description: "Demanda por especialização"
    },
    {
      videoId: "16NaDOmdgmE",
      title: "Especialização em Instrumentação Cirúrgica",
      description: "Prática profissional de instrumentação cirúrgica"
    }
  ]);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (term === '') {
      setFilteredVideos(filteredVideos);
    } else {
      const filtered = filteredVideos.filter(video =>
        video.title.toLowerCase().includes(term)
      );
      setFilteredVideos(filtered);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

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

  return (
    <>
      <HeaderContainer />
      <div className='search-bar-tutorials-box'>
      <div className="search-bar-tutorials">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <div className='icon-tutorials'>
          <FaSearch onClick={handleSearch} />
        </div>
      </div>
      <h1 className='h1-tutorials'>Tutoriais</h1>
      </div>

      <div className="tutorials-body">
        <div className="video-grid">
          {filteredVideos.map(video => (
            <YouTubeVideo
              key={video.videoId}
              videoId={video.videoId}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Tutoriais;
