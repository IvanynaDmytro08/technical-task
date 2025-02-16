import {FilmInterface} from "../interfaces/film.interface";
import {CharacterInterface} from "../interfaces/character.interface";


export const filmsFeatureKey = 'films';

export interface FilmState {
  isLoading: boolean;
  films: FilmInterface[] | null;
  selectedFilm: FilmInterface | null;
  character: CharacterInterface[] | null;
  selectedCharacter: CharacterInterface | null,
  isError: boolean;
}

export const initialState: FilmState = {
  isLoading: false,
  films: null,
  selectedFilm: null,
  character: null,
  selectedCharacter: null,
  isError: false
}
