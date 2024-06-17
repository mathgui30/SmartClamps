import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Apresentacao from '../pages/Apresentation/apresentacao';
import LoginForm from '../pages/Login/login';
import Home from '../pages/Home/home';
import Recuperacao from '../pages/Recuperation/recuperacao';
import Suporte from '../pages/Support/suporte';
import Tutorial from '../pages/Tutorial/tutorial';
import Profile from '../pages/Profile/profile';
import Relatorios from '../pages/Reports/relatorios';
import Cadastro from '../pages/Register/cadastro';
import Problem from '../pages/RegisterProblem/problem-register';
import Ok from '../pages/RegisterOk/ok-register';
import Inconformidade from '../pages/Unconformities/inconformidade';
import Procedimento from '../pages/Procedure/procedimento';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recuperacao" element={<Recuperacao />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/inconformidades" element={<Inconformidade />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/procedimento" element={<Procedimento />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/ok" element={<Ok />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
