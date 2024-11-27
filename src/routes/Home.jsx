import React, { useState, useEffect } from 'react';
import axiosConfig from '../axios/config';

import './Home.css';

import Campeonatos from '../components/Campeonatos';
import Jogos from '../components/Jogos';
import JogosLive from '../components/JogosLive';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [competitionsFootball, setCompetitionsFootball] = useState([]);

  const ccodes = ['BRA', 'ARG', 'ENG', 'ESP', 'POR', 'GER', 'FRA', 'ITA', 'KSA']

  const { axiosFootball } = axiosConfig;


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

      const responseLiveMatch = await axiosFootball.get(
        `/football-current-live`
      )

      console.log(responseLiveMatch)

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

      setLiveMatches(responseLiveMatch.data.response.live)
      setMatches(todayMatches);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompetitions = async () => {
    try {
      const responseChamps = await axiosFootball.get(
        '/football-get-all-leagues-with-countries'
      );
      console.log(responseChamps.data.response.leagues);
      setCompetitionsFootball(responseChamps.data.response.leagues);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getMatches();
    getCompetitions();
  }, []);

  return (
    <div className="container-home">
      <Campeonatos ccodes={ccodes} competitionsFootball={competitionsFootball}/>
      <JogosLive matches={matches} liveMatches={liveMatches}/>
      <Jogos matches={matches}/>
    </div>
  );
};

export default Home;
