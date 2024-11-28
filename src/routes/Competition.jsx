import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosConfig from '../axios/config';

const Competition = () => {
  const { code } = useParams();

  const ids = [
    268, 47, 48, 132, 54, 536, 10074, 146, 61, 185, 8814, 10077, 9067, 112,
    9305, 9381, 87, 140, 138, 53, 134, 207, 55, 86, 141,
  ];

  const [competitionsFootball, setCompetitionsFootball] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);

  const { axiosFootball } = axiosConfig;

  const getCompetitions = async () => {
    try {
      const responseChamps = await axiosFootball.get(
        '/football-get-all-leagues-with-countries'
      );
      setCompetitionsFootball(responseChamps.data.response.leagues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  useEffect(() => {
    if (competitionsFootball.length > 0) {
      const filteredCompetitions = competitionsFootball.filter(
        (competition) => competition.ccode === code
      );

      if (filteredCompetitions.length > 0 && filteredCompetitions[0].leagues) {
        const leagues = filteredCompetitions[0].leagues.filter((league) =>
          ids.includes(league.id)
        );
        setFilteredLeagues(leagues);
      }
    }
  }, [competitionsFootball, code]);

  console.log(filteredLeagues);
  console.log(competitionsFootball);

  return (
    <section className="container-champ">
      <h1>Principais Campeonatos</h1>
      <div className="champ">
        {filteredLeagues.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          filteredLeagues.map((league) => (
            <div className="competition" key={league.id}>
              <h2>{league.name}</h2>
              <Link
                to={`/competitions/${league.id}/tabela`}
                className="classificacao"
              >
                <h4>Classificação</h4>
              </Link>

              <Link
                to={`/competitions/${league.id}/artilharia`}
                className="artilharia"
              >
                <h4>Artilharia</h4>
              </Link>

              <Link
                to={`/competitions/${league.id}/assistencias`}
                className="classificacao"
              >
                <h4>Assistências</h4>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Competition;
{
  /* <Link to={`/competitions/${code}/tabela`} className="classificacao">
        <h1>Classificação</h1>
      </Link>
      <Link to={`/competitions/${code}/artilharia`} className="artilharia">
        <h1>Artilharia</h1>
      </Link>
      <Link to={`/competitions/${code}/tabela`} className="classificacao">
        <h1>Assistências</h1>
      </Link> */
}
