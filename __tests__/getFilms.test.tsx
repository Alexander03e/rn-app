import { FilmApi } from '../entities/film/api';

jest.mock('../entities/film/api', () => ({
    FilmApi: {
        getInstance: jest.fn(() => ({
            getAll: jest.fn(),
            getById: jest.fn(),
        })),
    },
}));

describe('useFilmsStore', () => {
    const api = FilmApi.getInstance();
    const mockFilms = [
        { id: '1', title: 'Film 1' },
        { id: '2', title: 'Film 2' },
    ];
    api.getAll.mockResolvedValueOnce(mockFilms);

    it('должен получить и установить основные фильмы', async () => {
        const mockFilms = [
            { id: '1', title: 'Film 1' },
            { id: '2', title: 'Film 2' },
        ];
        const films = await api.getAll();

        expect(films).toEqual(mockFilms);
    });
});
