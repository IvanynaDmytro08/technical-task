import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FilmState} from "./store.state";
import {filmsFeatureKey} from "./store.state";


export const featureSelector = createFeatureSelector<FilmState>(filmsFeatureKey);


export const selectFilms = createSelector(
  featureSelector,
  (filmState: FilmState) => filmState.films
)

export const selectFilmsIsLoading = createSelector(
  featureSelector,
  (filmState: FilmState) => filmState.isLoading
)

export const selectFilmsIsError = createSelector(
  featureSelector,
  (filmState: FilmState) => filmState.isError
)

export const selectSelectedFilm = createSelector (
  featureSelector,
  (filmState: FilmState) => filmState.selectedFilm
)

export const selectCharacters = createSelector(
  featureSelector,
  (filmState: FilmState) => filmState.character
)

export const selectCharactersLoading = createSelector(
  featureSelector,
  (filmState: FilmState) => filmState.isLoading
)

export const selectCharactersIsError = createSelector(
  featureSelector,
  (filmState: FilmState) => filmState.isError
)

export const selectSelectedCharacter = createSelector(
  featureSelector,
  (filmState: FilmState) => filmState.selectedCharacter
);
