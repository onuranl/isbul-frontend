import { create } from 'zustand';
import { Character, StatusFilter, GenderFilter } from '@/types/api';

interface CharacterStore {
  characters: Character[];
  selectedCharacters: Character[];
  favorites: number[];
  filters: {
    status: StatusFilter;
    gender: GenderFilter;
  };
  setCharacters: (characters: Character[]) => void;
  addToFavorites: (characterId: number) => void;
  removeFromFavorites: (characterId: number) => void;
  toggleFavorite: (characterId: number) => void;
  setFilters: (filters: Partial<CharacterStore['filters']>) => void;
  clearFilters: () => void;
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],
  selectedCharacters: [],
  favorites: [],
  filters: {
    status: '',
    gender: '',
  },

  setCharacters: (characters) => set({ characters }),

  addToFavorites: (characterId) =>
    set((state) => ({
      favorites: [...state.favorites, characterId],
    })),

  removeFromFavorites: (characterId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== characterId),
    })),

  toggleFavorite: (characterId) => {
    const { favorites } = get();
    if (favorites.includes(characterId)) {
      get().removeFromFavorites(characterId);
    } else {
      get().addToFavorites(characterId);
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set({
      filters: {
        status: '',
        gender: '',
      },
    }),
}));
