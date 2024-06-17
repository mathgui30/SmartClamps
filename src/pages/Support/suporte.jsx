import React, { useState } from 'react';
import { FaPhone, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OrnamentCircles from '../../components/OrnamentCircles/OrnamentCircles';
import HeaderContainer from '../../components/HeaderContainer/HeaderContainer'
import Footer from '../../components/Footer/Footer'
import '../Support/suporte.css'


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:0000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <HeaderContainer />
      <p className='title-suport'>Entre em contato para adquirir o SmartClamps™.</p>
      <form onSubmit={handleSubmit} className='form-suporte'>
        <div className='input-box'>
        <div className='text-box-suport'>
          <input
            type="text"
            name="name"
            className='input-suport'
            placeholder="Como devemos chamá-lo(a):"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='text-box-suport'>
          <input
            type="email"
            name="email"
            className='input-suport'
            placeholder="Digite um e-mail válido para contato:"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='email-box-suport'>
          <textarea
            name="message"
            className='textarea-suport'
            placeholder="Diga-nos brevemente todos os detalhes que deseja tratar e qual a melhor forma e horário para lhe contactarmos e entraremos em contato."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        <button className='button-suport' type="submit">Enviar</button>
      </form>
      <OrnamentCircles />
      <Footer />
    </>
  );
};

export default ContactForm;