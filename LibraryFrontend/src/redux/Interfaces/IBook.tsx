export interface IBook {
    id: number;
    title: string;
    isAvailable: boolean;
    authorId: number;
    author: {
        id: number;
        name: string;
    };
    genreId: number;
    genre: {
        id: number;
        name: string;
    };
    userId: number | null;
    user: {
        // Типизация пользователя, которому принадлежит книга, если она занята
    } | null;
    authorName: string;
    genreName: string;
}
