import React, { useState, useEffect } from 'react';
import axiosConfig from '../axios/config';
import { Link } from 'react-router-dom';

const Campeonatos = ({ccodes, competitionsFootball}) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  const filteredCompetitions = competitionsFootball.filter((competition) => 
    ccodes.includes(competition.ccode)
  )
  const competitionsVisibles = showAll || competitionsFootball.length <= 6
    ? filteredCompetitions
    : filteredCompetitions.slice(0, 6);

  return (
    <section className="container-competitions">
      <h1>Principais Campeonatos</h1>
      <div className="campeonatos">
        {filteredCompetitions.length === 0 ? (
          <p>Carregando</p>
        ) : (
          competitionsVisibles
            .map((competition, index) => (
              <div className="competition" key={index}>
                <h2>{competition.name}</h2>
                <Link to={`/competitions/${competition.ccode}`} className="btn">
                  Ler mais
                </Link>
              </div>
            ))
        )}
      </div>
      {filteredCompetitions.length > 6 && (
        <button onClick={handleToggleView} className="btn btn-toggle">
          {showAll ? 'Menos campeonatos' : 'Mais campeonatos'}
        </button>
      )}
    </section>
  );
};

export default Campeonatos;
