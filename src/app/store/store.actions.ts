import {createAction, props} from "@ngrx/store";
import {FilmInterface} from "../interfaces/film.interface";
import {CharacterInterface} from "../interfaces/character.interface";

export const getFilms = createAction(
  "[Films] Get Films",
)

export const getFilmsSuccess = createAction(
  "[Films] Get Films Success",
  props<{ films: FilmInterface[] }>()
)

export const getFilmsFailure = createAction(
  "[Films] Get Films Failure",
)

export const selectFilmById = createAction(
  '[Films] Select Film By Id',
  props<{ id: number }>()
);

export const getCharacters = createAction(
  "[Films] Get Characters",
)

export const getCharactersSuccess = createAction(
  "[Films] Get Characters Success",
  props<{ character: CharacterInterface[] }>()
)

export const getCharactersFailure = createAction(
  "[Films] Get Characters Failure",
)

export const selectCharacterByName = createAction(
  '[Films] Select Character By Name',
  props<{ name: string }>()
);
