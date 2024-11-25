import React, { useState, useEffect } from 'react';
import blogAxios from '../axios/config';
import { Link } from 'react-router-dom';

import './Home.css';

import Campeonatos from '../components/Campeonatos';
import Jogos from '../components/Jogos';

const Home = () => {
  

  return (
    <div className="container-home">
      <Jogos/>
      <Campeonatos/>
    </div>
  );
};

export default Home;
