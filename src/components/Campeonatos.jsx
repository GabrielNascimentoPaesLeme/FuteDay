import React, { useState, useEffect } from 'react';
import axiosConfig from '../axios/config';
import { Link } from 'react-router-dom';

const Campeonatos = () => {
  const [competitions, setCompetitions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { blogAxios, axiosFootball } = axiosConfig;

  const getCompetitions = async () => {
    try {
      const response = await blogAxios.get('/competitions');
      console.log(response.data.competitions);
      setCompetitions(response.data.competitions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  const competitionsVisibles = showAll ? competitions : competitions.slice(0, 6);

  useEffect(() => {
    getCompetitions();
  }, []);

  return (
    <div className='container-competitions'>
      <h1>Principais Campeonatos</h1>
      <div className="campeonatos">
        {competitions.length === 0 ? (
          <p>Carregando</p>
        ) : (
          competitionsVisibles.map((competition, index) => (
            <div className="competition" key={index}>
              <h2>{competition.name}</h2>
              <Link to={`/competitions/${competition.code}`} className="btn">
                Ler mais
              </Link>
            </div>
          ))
        )}
      </div>
      {competitions.length > 6 && (
        <button onClick={handleToggleView} className="btn btn-toggle">
          {showAll ? 'Menos campeonatos' : 'Mais campeonatos'}
        </button>
      )}
    </div>
  );
};

export default Campeonatos;
