import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogAxios from '../axios/config';
import './Tabela.css';

const Post = () => {
  const { code } = useParams();

  const [tables, setTables] = useState([]);

  const getTable = async () => {
    try {
      const response = await blogAxios.get(`/competitions/${code}/standings`);
      const data = response.data.standings[0].table;
      setTables(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTable();
  }, []);

  return (
    <div>
      {tables.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        tables.map((table, index) => (
          <div className="tabela" key={index}>
            <div className='position'>
              <h4>{table.position}º</h4>
              <h4>{table.team.shortName}</h4>
            </div>
            <div className='matches'>
              <h4>{table.points}</h4>
              <h4>{table.playedGames}</h4>
              <h4>{table.won}</h4>
              <h4>{table.draw}</h4>
              <h4>{table.lost}</h4>
              <h4>{table.goalsAgainst}</h4>
              <h4>{table.goalsFor}</h4>
              <h4>{table.goalDifference}</h4>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
