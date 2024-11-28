import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Jogos = ({ matches }) => {
  const [showAllTodayMatches, setShowAllTodayMatches] = useState(false);

  const convertToLocalTime = (utcDate) => {
    const date = new Date(utcDate);
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Detecta o fuso local
    return date.toLocaleString('pt-BR', { timeZone: localTimeZone });
  };

  const upcomingMatches = matches.filter((match) => !match.status.started);

  const matchesVisibles =
    showAllTodayMatches || upcomingMatches.length <= 6
      ? upcomingMatches
      : upcomingMatches.slice(0, 6);

  return (
    <section className="container-competitions">
      <h1>Jogos Do Dia</h1>
      <div className="jogos">
        {matches.length === 0 ? (
          <p>Carregando... / Não possui jogos Programados para hoje</p>
        ) : (
          matchesVisibles.map((match, index) => (
            <Link
              to={`/matches/${match.id}`}
              className="competition"
              key={index}
            >
              <h3>
                {match.home.name} x {match.away.name}
              </h3>
              <p>
                {match.home.score} x {match.away.score}
              </p>
              <div>
                <h4>{convertToLocalTime(match.status.utcTime)}</h4>
              </div>
            </Link>
          ))
        )}
      </div>
      {upcomingMatches.length > 6 && (
        <button
          onClick={() => setShowAllTodayMatches(!showAllTodayMatches)}
          className="btn btn-toggle"
        >
          {showAllTodayMatches ? 'Ver menos Jogos' : 'Ver todos os jogos'}
        </button>
      )}
    </section>
  );
};

export default Jogos;
