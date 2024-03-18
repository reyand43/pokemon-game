export function getRandomPokemonId(): number {
  return Math.floor(Math.random() * (1025)) + 1;
}
