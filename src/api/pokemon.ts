import axios from "axios"
import { ResponseGetPokemon } from "../types/responses/getPokemon"
import { POKEMON_API_URL } from "../const/globalVars"

export const fetchPokemonById = async ({ id }: { id: number }): Promise<ResponseGetPokemon> => {
  const response = await axios.get(POKEMON_API_URL + `/${id}`)
  return response.data
}

