import {createReducer, on} from "@ngrx/store";
import {FilmState, initialState} from "./store.state";
import {
  getCharacters, getCharactersFailure, getCharactersSuccess,
  getFilms,
  getFilmsFailure,
  getFilmsSuccess, selectCharacterByName, selectFilmById
} from "./store.actions";

export const reducer = createReducer(
  initialState,

  on(getFilms, (state: FilmState): FilmState => {
    return {...state, isLoading: true};
  }),

  on(getFilmsSuccess, (state: FilmState, action): FilmState => {
    return {...state, isLoading: false, films: action.films};
  }),

  on(getFilmsFailure, (state: FilmState): FilmState => {
    return {...state, isLoading: false, isError: true};
  }),

  on(selectFilmById, (state, {id}) => {

    const selectedFilm = state.films?.find(film => +film.episode_id === +id);

    return {
      ...state,
      selectedFilm: selectedFilm || null
    };
  }),

  on(getCharacters, (state: FilmState): FilmState => {
    return {...state, isLoading: true};
  }),

  on(getCharactersSuccess, (state: FilmState, {character}): FilmState => {
    return {...state, isLoading: false, character: character};
  }),

  on(getCharactersFailure, (state: FilmState): FilmState => {
    return {...state, isLoading: false, isError: true};
  }),

  on(selectCharacterByName, (state, {name}) => {

    const character = state.character?.find(character => character.name.toLowerCase() === name.toLowerCase());

    if (character) {
      return {
        ...state,
        selectedCharacter: character,
        isLoading: false,
        isError: false
      };
    } else {

      return {
        ...state,
        selectedCharacter: null,
        isLoading: false,
        isError: true
      };
    }
  }),
)
