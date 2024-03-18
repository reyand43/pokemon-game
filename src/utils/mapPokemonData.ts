import { IPokemon } from "../types/IPokemon";
import { ResponseGetPokemon } from "../types/responses/getPokemon";

export function mapPokemonData(pokemon: ResponseGetPokemon): IPokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.front_default,
    health: 100
  }
}