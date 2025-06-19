export interface IBook {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description: string,
    copies: number,
    available: boolean
}


export interface BookQueryParams {
  filter?: IBook["genre"];
  sortBy?: string;
  sort?: 'asc' | 'desc';
  limit?: number;
}