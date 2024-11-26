import React, { useState, useEffect } from 'react';
import axiosConfig from '../axios/config';
import { Link, useParams } from 'react-router-dom';

const Jogos = () => {
  const [matches, setMatches] = useState([]);
  const [showAllTodayMatches, setShowAllTodayMatches] = useState(false);
  const [showAllStartedMatches, setShowAllStartedMatches] = useState(false);

  const { blogAxios, axiosFootball } = axiosConfig;


  const getMatches = async () => {
    const date = new Date();
    const nextDay = new Date();

    nextDay.setDate(date.getDate() + 1);

    const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
    const formattedNextDay = nextDay
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '');

    try {
      const response = await axiosFootball.get(
        `/football-get-matches-by-date?date=${formattedDate}`
      );

      const responseTomorrow = await axiosFootball.get(
        `/football-get-matches-by-date?date=${formattedNextDay}`
      );

      console.log(response)

      const allMatches = [
        ...response.data.response.matches,
        ...responseTomorrow.data.response.matches,
      ];

      const todayMatches = allMatches.filter((match) => {
        const matchTimeUtc = new Date(match.status.utcTime);
        const matchLocalTime = new Date(
          matchTimeUtc.toLocaleString('en-US', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        );

        const hours = matchLocalTime.getHours();
        const day = matchLocalTime.getDate();

        return (
          (day === date.getDate() && hours >= 3) ||
          (day === nextDay.getDate() && hours < 3)
        );
      });

      setMatches(todayMatches);
    } catch (error) {
      console.log(error);
    }
  };

  const convertToLocalTime = (utcDate) => {
    const date = new Date(utcDate);
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Detecta o fuso local
    return date.toLocaleString('pt-BR', { timeZone: localTimeZone });
  };

  const liveMatches = matches.filter(
    (match) => match.status.started && !match.status.finished
  );
  const upcomingMatches = matches.filter((match) => !match.status.started);

  const matchesVisiblesStarted =
    showAllTodayMatches || liveMatches.length <= 6
      ? liveMatches
      : liveMatches.slice(0, 6);

  const matchesVisibles =
    showAllStartedMatches || upcomingMatches.length <= 6
      ? upcomingMatches
      : upcomingMatches.slice(0, 6);

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div className="container-competitions">
      <h1>Jogos Agora</h1>
      <div className="jogos">
        {matches.length === 0 ? (
          <p>Sem jogos no Momento</p>
        ) : (
          matchesVisiblesStarted.map(
            (match, index) =>
              (
                <div className="competition" key={index}>
                  <h3>
                    {match.home.name} x {match.away.name}
                  </h3>
                  <p>
                    {match.home.score} x {match.away.score}
                  </p>
                  <div>
                    <h4>Jogando Agora</h4>
                  </div>
                </div>
              )
          )
        )}
      </div>
      {matches.length > 6 && (
        <button onClick={() => setShowAllTodayMatches(!showAllTodayMatches)} className="btn btn-toggle">
          {showAllTodayMatches ? 'Ver menos' : 'Mais jogos agora'}
        </button>
      )}
      <h1>Jogos Do Dia</h1>
      <div className="jogos">
        {matches.length === 0 ? (
          <p>Carregando ou Não possui jogos para o momento</p>
        ) : (
          matchesVisibles.map(
            (match, index) =>
              (
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
              )
          )
        )}
      </div>
      {upcomingMatches.length > 6 && (
        <button onClick={() => setShowAllStartedMatches(!showAllStartedMatches)} className="btn btn-toggle">
          {showAllStartedMatches ? 'Ver menos Jogos' : 'Ver todos os jogos'}
        </button>
      )}
    </div>
  );
};

export default Jogos;
