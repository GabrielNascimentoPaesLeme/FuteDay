import React from 'react';
import { Link, useParams } from 'react-router-dom';
import blogAxios from '../axios/config';

const Competition = () => {
  const { code } = useParams();

  
  return (
    <div className='container-champ'>
        <Link to={`/competitions/${code}/tabela`} className="classificacao">
          <h1>Tabela Classificatória</h1>
        </Link>
        <Link to={`/competitions/${code}/artilharia`} className="artilharia">
          <h1>Artilharia</h1>
        </Link>
        <Link to={`/competitions/${code}/tabela`} className="classificacao">
          <h1>Assistências</h1>
        </Link>
    </div>
  );
};

export default Competition;
