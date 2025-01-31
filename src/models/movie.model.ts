export interface Movie {
  id: number;
  genres: string[];
  original_language: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  cast: Cast[];
  crew: Crew[];
  keywords: string[];
  objectID: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface Cast {
  name: string,
  character: string
}

export interface Crew {
  name: string,
  job: string
}