import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const JogosLive = ({ liveMatches }) => {
  const [showAllStartedMatches, setShowAllStartedMatches] = useState(false);

  const matchesVisiblesStarted =
    showAllStartedMatches || liveMatches.length <= 6
      ? liveMatches
      : liveMatches.slice(0, 6);

  return (
    <section className="container-competitions">
      <h1>Jogos Agora</h1>
      <div className="jogos">
        {liveMatches.length === 0 ? (
          <p>Sem jogos no Momento</p>
        ) : (
          matchesVisiblesStarted.map((match, index) => (
            <Link className="competition" key={index}>
              <h3>
                {match.home.name} x {match.away.name}
              </h3>
              <p>
                {match.home.score} x {match.away.score}
              </p>
              <div>
                <h4>Jogando Agora</h4>
              </div>
            </Link>
          ))
        )}
        {liveMatches.length > 6 && (
          <button
            onClick={() => setShowAllStartedMatches(!showAllStartedMatches)}
            className="btn btn-toggle"
          >
            {showAllStartedMatches ? 'Ver menos' : 'Mais jogos agora'}
          </button>
        )}
      </div>
    </section>
  );
};

export default JogosLive;
