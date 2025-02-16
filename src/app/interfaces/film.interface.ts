import {CharacterInterface} from "./character.interface";

export interface FilmsResultInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: FilmInterface[];
}

export interface FilmInterface {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: CharacterInterface[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}
