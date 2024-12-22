import { Film } from '../../film/model';
import { create, StateCreator } from 'zustand';

interface FavoriteState {
    films: Partial<Film>[];

    addFilm: (data: Partial<Film>) => void;
    removeFilm: (id: string) => void;
}

const favoriteSlice: StateCreator<FavoriteState> = (set, get) => ({
    films: [],

    addFilm: film => {
        const prev = get().films;

        set({ films: [...prev, film] });
    },

    removeFilm: id => {
        const prev = get().films;

        const filtered = prev?.filter(item => String(item.id) !== String(id));

        set({ films: filtered });
    },
});

export const useFavoriteStore = create(favoriteSlice);
