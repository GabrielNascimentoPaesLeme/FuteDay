import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosConfig from '../axios/config';
import './Tabela.css';

const Post = () => {
  const { id } = useParams();

  const { axiosFootball } = axiosConfig;

  const [tables, setTables] = useState([]);

  const getTable = async () => {
    try {
      const response = await axiosFootball.get(
        `/football-get-standing-all?leagueid=${id}`
      );
      const data = response.data.response.standing;
      setTables(data);
      console.log(data);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTable();
  }, []);

  const getSaldo = (scoreStr) => {
    const scores = scoreStr.split('-');
    const [goalsScored, goalsConceded] = scores.map(Number);
    return goalsScored - goalsConceded;
  };

  const goalScored = (scoreStr) => {
    const scores = scoreStr.split('-');
    const [goalsScored, goalsConceded] = scores.map(Number);
    return goalsScored;
  };

  return (
    <div>
      {tables.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <div className="tabela">
            <div className="position">
              <h4>Pos.</h4>
            </div>
            <div className="matches">
              <h4>Pts</h4>
              <h4>J</h4>
              <h4>V</h4>
              <h4>E</h4>
              <h4>D</h4>
              <h4>G.F</h4>
              <h4>G.S</h4>
              <h4>S.G</h4>
            </div>
          </div>
          {tables.map((table, index) => (
          <div className="tabela" key={index}>
            <div className="position">
              <h4>{table.idx}º</h4>
              <h4>{table.name}</h4>
            </div>
            <div className="matches">
              <h4>{table.pts}</h4>
              <h4>{table.played}</h4>
              <h4>{table.wins}</h4>
              <h4>{table.draws}</h4>
              <h4>{table.losses}</h4>
              <h4>{goalScored(table.scoresStr)}</h4>
              <h4>{table.goalConDiff}</h4>
              <h4>{getSaldo(table.scoresStr)}</h4>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
