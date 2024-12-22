import { AxiosInstance } from 'axios';
import { $api } from './axios';
import { DetailedFilm, Film, FilmsResponse } from '../model';

export class FilmApi {
    private static baseInstance: FilmApi | null = null;
    private apiInstance: AxiosInstance;

    constructor() {
        this.apiInstance = $api;
    }

    static getInstance() {
        if (this.baseInstance) return this.baseInstance;

        this.baseInstance = new FilmApi();

        return this.baseInstance;
    }

    async getAll(): Promise<Film[]> {
        return (
            await this.apiInstance.get(
                // 'movie?rating.imdb=8-10&notNullFields=poster.url&lists=top250',
                'movie',
            )
        ).data;
    }

    // TODO: Поменять методы когда перейду на нормальную апи
    async getById(id: string): Promise<DetailedFilm[]> {
        // return (await this.apiInstance.get(`movie/${id}`)).data;
        return (await this.apiInstance.get(`film`)).data;
    }
}
