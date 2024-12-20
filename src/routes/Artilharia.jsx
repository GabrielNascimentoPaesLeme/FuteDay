import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosConfig from '../axios/config';
import './Artilharia.css';

const Artilharia = () => {
  const [artilheiros, setArtilheiros] = useState([]);
  const { axiosFootball } = axiosConfig;

  const { id } = useParams();
  const getCompetition = async () => {
    try {
      const response = await axiosFootball.get(
        `/football-get-top-players-by-goals?leagueid=${id}`
      );
      const data = response.data.response.players;
      setArtilheiros(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompetition();
  }, []);

  return (
    <div className="container-artilharia">
      {artilheiros.length === 0 ? (
        <p>Carregando</p>
      ) : (
        <div>
          <h1>Artilheiros</h1>
          {artilheiros.map((artilheiro, index) => (
          <div className="artilheiro" key={index}>
            <div className="player">
              <h3>
                {index + 1}º {artilheiro.name}
              </h3>
              <p>{artilheiro.teamName}</p>
            </div>
            <div className="infos">
              <p>{artilheiro.goals} Gols marcados</p>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artilharia;
