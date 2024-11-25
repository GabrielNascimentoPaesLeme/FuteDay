import React, { useState, useEffect } from 'react';
import blogAxios from '../axios/config';
import { Link } from 'react-router-dom';

const Jogos = () => {
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    try {
      const response = await blogAxios.get('/matches');
      console.log(response.data.matches);
      setMatches(response.data.matches);
    } catch (error) {
      console.log(error);
    }
  };

  const convertToLocalTime = (utcDate) => {
    const date = new Date(utcDate);
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Detecta o fuso local
    return date.toLocaleString('pt-BR', { timeZone: localTimeZone });
  };

  useEffect(() => {
    getMatches();
  }, []);

  console.log(matches);
  return (
    <div>
      <h1>Jogos do dia</h1>
      <div className="jogos">
        {matches.length === 0 ? (
          <p>Carregando</p>
        ) : (
          matches.map((match, index) => (
            <Link to={`/matches/${match.id}`} className="competition" key={index}>
              <h4>{match.competition.name}</h4>
              <h3>
                {match.homeTeam.shortName} x {match.awayTeam.shortName}
              </h3>
              <p>{convertToLocalTime(match.utcDate)}</p>
              {match.status !== 'TIMED' ? (
                <div className='score'>
                  <p>
                    {match.score.fullTime.home} x {match.score.fullTime.away}
                  </p>
                  <p>{match.status}</p>
                </div>
              ) : (
                <p>{match.utcDate}</p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Jogos;
