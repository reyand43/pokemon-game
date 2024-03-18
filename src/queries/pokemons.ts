import { useMutation, useQuery } from "react-query";
import { fetchPokemonById } from "../api/pokemon";
import { mapPokemonData } from "../utils/mapPokemonData";

export function usePokemonsQuery({ id }: { id: number }) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonById({ id }).then(mapPokemonData),
  })
}

export function useRandomPokemonsQuery() {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchPokemonById({ id }).then(mapPokemonData),
  })
}
