import { DetailedFilm, Film } from './index';
import { create, StateCreator } from 'zustand';
import { FilmApi } from '../api';

type FilmsState = {
    mainFilms: Film[] | undefined;
    isLoading: boolean;
    error: string | null;
    detailedFilm: DetailedFilm | undefined;
};

type FilmActions = {
    getDetailedFilm: (id: string) => void;
    getMainFilms: () => Promise<void>;
    setIsLoading: (data: FilmsState['isLoading']) => void;
    setError: (data: FilmsState['error']) => void;
};

type FilmsStore = FilmsState & FilmActions;

const api = FilmApi.getInstance();

const filmsSlice: StateCreator<FilmsStore> = (set, get) => ({
    mainFilms: undefined,
    error: null,
    isLoading: false,
    detailedFilm: undefined,

    getDetailedFilm: async id => {
        set({ isLoading: true });
        try {
            const detailedFilm = (await api.getById(id))[0];

            set({ detailedFilm });
        } catch (e) {
            set({ error: 'Error detailed' });
        } finally {
            set({ isLoading: false });
        }
    },
    getMainFilms: async () => {
        set({ isLoading: true });
        try {
            const mainFilms = await api.getAll();

            set({ mainFilms });
        } catch (e) {
            set({ error: 'Error' });
        } finally {
            set({ isLoading: false });
        }
    },
    setError: error => set({ error }),
    setIsLoading: isLoading => set({ isLoading }),
});

export const useFilmsStore = create<FilmsStore>(filmsSlice);
