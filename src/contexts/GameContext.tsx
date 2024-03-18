import React, { ReactNode, useEffect, useState } from 'react';
import { IPokemon } from '../types/IPokemon';
import { useRandomPokemonsQuery } from '../queries/pokemons';
import { setResults } from '../utils/setResults';
import { getRandomPokemonId } from '../utils/getRandomPokemonId';
import { clearResults } from '../utils/clearResults';

interface Props {
  children: ReactNode;
}

interface ContextValue {
  setPokemons: (pokemons: { playerPokemon: IPokemon, opponentPokemon: IPokemon }) => void;
  playerPokemon: IPokemon | null;
  opponentPokemon: IPokemon | null;
  attack: (attacks: { playerAttack: number, opponentAttack: number }) => void;
  gameStatus: 'initial' | 'playing' | 'lost' | 'win';
  generateNewOpponent: () => void;
}

const GameContext = React.createContext<ContextValue>({} as any);

function GameContextProvider({ children }: Props) {
  const [playerPokemon, setPlayerPokemon] = useState<IPokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<IPokemon | null>(null);
  const [gameStatus, setGameStatus] = useState<'initial' | 'playing' | 'lost' | 'win'>('initial');
  const randomPokemonsQuery = useRandomPokemonsQuery();

  const setPokemons = (payload: { playerPokemon: IPokemon, opponentPokemon: IPokemon }) => {
    clearResults();
    setPlayerPokemon(payload.playerPokemon);
    setOpponentPokemon(payload.opponentPokemon);
    setGameStatus('playing');
  }

  const attack = ({ playerAttack, opponentAttack }: { playerAttack: number, opponentAttack: number }) => {
    if (playerPokemon !== null && opponentPokemon !== null) {
      const newPlayerHealth = playerPokemon.health - opponentAttack;
      const newOpponentHealth = opponentPokemon.health - playerAttack;

      if (newPlayerHealth > 0 && newOpponentHealth > 0) {
        setPlayerPokemon((prev) => prev ? ({ ...prev, health: newPlayerHealth }) : null);
        setOpponentPokemon((prev) => prev ? ({ ...prev, health: newOpponentHealth }) : null);
        return;
      }

      if (newPlayerHealth <= 0 || newOpponentHealth <= 0) {
        if (newPlayerHealth >= newOpponentHealth) {
          setGameStatus('win');
          setOpponentPokemon((prev) => prev ? ({ ...prev, health: 0 }) : null);
          setResults({ opponent: opponentPokemon.name, won: true });
        } else {
          setGameStatus('lost');
          setPlayerPokemon((prev) => prev ? ({ ...prev, health: 0 }) : null);
          setResults({ opponent: opponentPokemon.name, won: false });
        }
      }
    }
  }

  useEffect(() => {
    if (randomPokemonsQuery.data && gameStatus === 'initial') {
      setOpponentPokemon(randomPokemonsQuery.data);
      setPlayerPokemon((prev) => prev ? ({ ...prev, health: 100 }) : null);
      setGameStatus('playing');
    }
  }, [randomPokemonsQuery.data, gameStatus])

  const generateNewOpponent = async () => {
    setGameStatus('initial');
    const id = getRandomPokemonId();
    randomPokemonsQuery.mutate({ id })
  }

  const contextValue = {
    setPokemons,
    playerPokemon,
    opponentPokemon,
    attack,
    gameStatus,
    generateNewOpponent,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
}

export { GameContextProvider, GameContext };