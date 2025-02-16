import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FilmService} from "../services/film.service";
import {catchError, map, mergeMap, of} from "rxjs";
import {
  getCharactersFailure,
  getCharactersSuccess,
  getFilms,
  getFilmsFailure,
  getFilmsSuccess
} from "./store.actions";
import {FilmsResultInterface} from "../interfaces/film.interface";

@Injectable()
export class StoreEffects {
  private actions$ = inject(Actions);  // Використання нового способу інжекції
  private filmService = inject(FilmService);

  getFilms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getFilms),
      mergeMap(() => {
        return this.filmService.getFilms().pipe(
          map((response: FilmsResultInterface) => {
            return getFilmsSuccess({films: response.results});
          }),
          catchError(() => of(getFilmsFailure())) // Якщо сталася помилка
        );
      })
    );
  });

  getCharacters$ = createEffect(() => {
    return this.filmService.getAllCharacters().pipe(
      map((characters) => getCharactersSuccess({ character: characters })), // Успішний результат
      catchError(() => of(getCharactersFailure())) // Обробка помилки
    );
  });
}
