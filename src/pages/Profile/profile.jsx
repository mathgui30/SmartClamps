import React, { useEffect, useState } from 'react';
import Vector from '../../assets/Vector.png';
import '../Profile/profile.css';
import HeaderContainer from "../../components/HeaderContainer/HeaderContainer";
import { db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function Profile() {
    const [profileData, setProfileData] = useState({
        nomeCompleto: '',
        email: '',
        cpf: '',
        setor: '',
        cargo: '',
        photoURL: Vector
    });

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'professionals', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setProfileData({
                            nomeCompleto: userData.nomeCompleto || '',
                            email: user.email,
                            cpf: userData.cpf || '',
                            setor: userData.setor || '',
                            cargo: userData.especialidade || '',
                            photoURL: userData.photoURL || Vector
                        });
                    } else {
                        console.error('Documento não encontrado para o usuário:', user.uid);
                    }
                } catch (error) {
                    console.error('Erro ao buscar documento:', error);
                }
            }

        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <HeaderContainer />
            <div className="container-profile">
                <form action="#" className="form-container-profile" method="POST">
                    <div className="form-group-profile">
                        <div className="photo-upload-profile">
                            <input type="file" id="photo" name="photo" accept="image/*" style={{ display: 'none' }} />
                            <label htmlFor="photo">
                                <img id="profile-pic" src={profileData.photoURL} alt="Foto" />
                            </label>
                        </div>
                    </div>
                    <div className="profile-fields">
                        <div className="form-group-profile">
                            <label htmlFor="nomeCompleto">Nome Completo:</label>
                            <input type="text" id="nomeCompleto" name="nomeCompleto" className="campoComposto1" placeholder="Nome completo" value={profileData.nomeCompleto} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group-profile">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={profileData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group-profile">
                            <label htmlFor="cpf">CPF:</label>
                            <input type="text" id="cpf" name="cpf" value={profileData.cpf} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group-profile">
                            <label htmlFor="setor">Setor:</label>
                            <input type="text" id="setor" name="setor" value={profileData.setor} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group-profile">
                            <label htmlFor="cargo">Cargo:</label>
                            <input type="text" id="cargo" name="cargo" value={profileData.cargo} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="edit-password-profile">
                        <button type="button" className="edit-password">Editar Senha</button>
                    </div>
                    <div className="form-group-profile">
                        <button type="submit" className="button-profile">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Profile;
