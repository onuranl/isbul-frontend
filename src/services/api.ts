import { CharacterResponse, FilterParams } from '@/types/api';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const characterService = {
  getCharacters: async (params?: FilterParams): Promise<CharacterResponse> => {
    const url = new URL(`${BASE_URL}/character`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.statusText}`);
    }

    return response.json();
  },

  getCharacterById: async (id: number) => {
    const response = await fetch(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch character: ${response.statusText}`);
    }

    return response.json();
  },
};
