export enum EMovie {
    MOVIE = 'movie',
}

interface Attribute {
    name: string;
}

export type Film = {
    id: number;
    name: string;
    type: EMovie;
    year: number;
    description: string | null;
    shortDescription: string | null;
    genres: Attribute[];
    countries: Attribute[];
    poster?: {
        url: string;
        previewUrl: string;
    };
    rating: {
        imdb: number;
    };
};

export type DetailedFilm = Film & {
    kp: number;
    movieLength: number;
    persons: {
        id: number;
        photo: string;
        name: string;
        description: string;
        prefession: string;
    }[];
    watchability: {
        items: {
            name: string;
            logo: { url: string };
            url: string;
        }[];
    };
};

export type FilmsResponse = {
    docs: Film[];
};
