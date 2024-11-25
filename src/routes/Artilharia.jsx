import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import blogAxios from '../axios/config';
import './Artilharia.css';

const Artilharia = () => {
  const [artilheiros, setArtilheiros] = useState([]);

  const { code } = useParams();
  const getCompetition = async () => {
    try {
      const response = await blogAxios.get(`/competitions/${code}/scorers`);
      const data = response.data.scorers;
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
        artilheiros.map((artilheiro, index) => (
          <div className="artilheiro" key={index}>
            <div className='player'>
              <h3>{artilheiro.player.name}</h3>
              <p>{artilheiro.team.name}</p>
            </div>
            <div className="infos">
              <p>{artilheiro.goals}</p>
              <p>{artilheiro.playedMatches}</p>
              <p>{artilheiro.penalties || 0}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Artilharia;
