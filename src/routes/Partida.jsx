import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import blogAxios from '../axios/config';

const Partida = () => {
  const { id } = useParams();
  const [match, setMatch] = useState([]);

  const getMatch = async () => {
    try {
      const response = await blogAxios.get(`/matches/${id}`);
      setMatch(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatch();
  }, []);
  console.log(match);
  return (
    <div>
      {match.competition ? (
        <div>
          <h1>{match.competition.name}</h1>
          <h3>
            {match.homeTeam.shortName} x {match.awayTeam.shortName}
          </h3>
          <p>{match.status}</p>
          <p>
            {match.score.fullTime.home} x {match.score.fullTime.away}
          </p>
        </div>
      ) : (
        <h2>Carregando</h2>
      )}
    </div>
  );
};

export default Partida;
