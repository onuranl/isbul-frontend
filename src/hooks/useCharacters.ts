import { useQuery } from '@tanstack/react-query';
import { characterService } from '@/services/api';
import { FilterParams } from '@/types/api';

export const useCharacters = (filters: FilterParams) => {
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => characterService.getCharacters(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => characterService.getCharacterById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
