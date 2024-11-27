import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosConfig from '../axios/config';
import './Artilharia.css';


const Assistencias = () => {
  const [assists, setAssists] = useState([]);
  const { axiosFootball } = axiosConfig;

  const { id } = useParams();
  const getCompetition = async () => {
    try {
      const response = await axiosFootball.get(
        `/football-get-top-players-by-assists?leagueid=${id}`
      );
      const data = response.data.response.players;
      setAssists(data);
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
      {assists.length === 0 ? (
        <p>Carregando</p>
      ) : (
        <div>
          <h1>Garçons</h1>
          {assists.map((assist, index) => (
          <div className="artilheiro" key={index}>
            <div className="player">
              <h3>
                {index + 1}º {assist.name}
              </h3>
              <p>{assist.teamName}</p>
            </div>
            <div className="infos">
              <p>{assist.assists} Passes diretos para gol</p>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Assistencias