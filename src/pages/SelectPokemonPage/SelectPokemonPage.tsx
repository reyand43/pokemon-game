import React from 'react';
import styles from './SelectPokemonPage.module.scss';
import { usePokemonsQuery } from '../../queries/pokemons';
import { getRandomPokemonId } from '../../utils/getRandomPokemonId';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { Button } from '../../components/Button/Button';
import { GameContext } from '../../contexts/GameContext';
import { useNavigate } from 'react-router-dom';

export const SelectPokemonPage = () => {
  const [playerPokemonId, setPlayerPokemonId] = useState<number>(getRandomPokemonId());
  const [opponentPokemonId, setOpponentPokemonId] = useState<number>(getRandomPokemonId());
  const { setPokemons, gameStatus } = useContext(GameContext);
  const playerPokemon = usePokemonsQuery({ id: playerPokemonId });
  const opponentPokemon = usePokemonsQuery({ id: opponentPokemonId });
  const navigate = useNavigate();

  const handleClickChangePlayer = () => {
    setPlayerPokemonId(getRandomPokemonId());
  }

  const handleClickChangeOpponent = () => {
    setOpponentPokemonId(getRandomPokemonId());
  }

  const handleStart = useCallback(() => {
    if (playerPokemon.data && opponentPokemon.data) {
      setPokemons({
        playerPokemon: playerPokemon.data,
        opponentPokemon: opponentPokemon.data
      })
    }
  }, [playerPokemon.data, opponentPokemon.data, setPokemons])

  useEffect(() => {
    if (gameStatus === 'playing') {
      navigate('/game');
    }
  }, [gameStatus, navigate])

  return (
    <div className={styles.root}>
      <h1>Select your Pokemon</h1>
      <div className={styles.players}>
        <div className={styles.leftColumn}>
          <h2>Your pokemon</h2>
          <div className={styles.pokemonCard}>
            {playerPokemon.isLoading && <Loader />}
            {playerPokemon.data &&
              <>
                <p>{capitalizeFirstLetter(playerPokemon.data.name)}</p>
              <img src={playerPokemon.data.imageUrl} alt={playerPokemon.data.name} className={styles.pokemonImage} />
                <Button onClick={handleClickChangePlayer}>Change</Button>
              </>
            }
          </div>
        </div>
        <div className={styles.rightColumn}>
          <h2>Computer pokemon</h2>
          <div className={styles.pokemonCard}>
            {opponentPokemon.isLoading && <Loader />}
            {opponentPokemon.data &&
              <>
                <p>{capitalizeFirstLetter(opponentPokemon.data.name)}</p>
                <img src={opponentPokemon.data.imageUrl} alt={opponentPokemon.data.name} className={styles.pokemonImage} />
                <Button onClick={handleClickChangeOpponent}>Change</Button>
              </>
            }
          </div>
        </div>
      </div>
      <Button onClick={handleStart}>Start Battle</Button>
    </div>
  );
}