import React, { useContext, useState } from "react";
import { HealthPoints } from "../../components/HealthPoints/HealthPoints";
import styles from './GamePage.module.scss';
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { GameContext } from "../../contexts/GameContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import YouWin from "../../images/YouWin.png";
import GameOver from "../../images/GameOver.png";
import { getResults } from "../../utils/getResults";
import { Loader } from "../../components/Loader/Loader";
import { clearResults } from "../../utils/clearResults";

export const GamePage = () => {
  const { attack, playerPokemon, opponentPokemon, gameStatus, generateNewOpponent } = useContext(GameContext);
  const navigate = useNavigate();
  const [attacks, setAttacks] = useState<{ playerAttack: number, opponentAttack: number } | null>(null);

  function rollDice(): number {
    const value = Math.floor(Math.random() * 6) + 1;
    if (value === 6) {
      return value + rollDice();
    }
    return value;
  }

  const handleAttack = () => {
    const playerRoll = rollDice();
    const opponentRoll = rollDice();

    attack({
      playerAttack: playerRoll,
      opponentAttack: opponentRoll
    });

    setAttacks({ playerAttack: playerRoll, opponentAttack: opponentRoll });

    setTimeout(() => {
      setAttacks(null);
    }, 1000);
  };

  const handleClickChooseNewPokemon = () => {
    navigate('/select-pokemon');
    clearResults();
  }

  if (!playerPokemon || !opponentPokemon) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.players}>
        <div className={styles.leftColumn}>
          <h2>{capitalizeFirstLetter(playerPokemon.name)}</h2>
          <HealthPoints value={playerPokemon.health} />
          <img src={playerPokemon.imageUrl} alt={playerPokemon.name} className={styles.pokemonImage} />
          {attacks && <span className={styles.attack}>{`-${attacks.opponentAttack}`}</span>}
        </div>
        <div className={styles.rightColumn}>
          <h2>{capitalizeFirstLetter(opponentPokemon.name)}</h2>
          <HealthPoints value={opponentPokemon.health} />
          <img src={opponentPokemon.imageUrl} alt={opponentPokemon.name} className={styles.pokemonImage} />
          {attacks && <span className={styles.attack}>{`-${attacks.playerAttack}`}</span>}
        </div>
      </div>
      <Button onClick={handleAttack} disabled={!!attacks}>Attack</Button>
      {gameStatus === 'initial' &&
        <div className={styles.backdrop}>
          <Loader />
        </div>}
      {(gameStatus === 'win' || gameStatus === 'lost') && (
        <div className={styles.backdrop}>
          {gameStatus === 'lost' && (<img src={GameOver} alt="GameOver" />)}
          {gameStatus === 'win' && (<img src={YouWin} alt="YouWin" />)}
          <Button onClick={generateNewOpponent} >Continue with {capitalizeFirstLetter(playerPokemon.name)}</Button>
          <Button onClick={handleClickChooseNewPokemon} >Choose new Pokemon</Button>
          <ul className={styles.results}>
            <p className={styles.results__title}>Results</p>
            {getResults().map((result) => (
              <li key={result.opponent}>
                {`${capitalizeFirstLetter(result.opponent)} ${result.won ? 'WIN' : 'LOSE'}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}