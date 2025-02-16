import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FilmsResultInterface} from "../interfaces/film.interface";
import {Observable, of, tap} from "rxjs";
import {CharacterInterface, CharacterResponseInterface} from "../interfaces/character.interface";

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private cachedFilms: FilmsResultInterface | null = null;

  constructor(private http: HttpClient) {}

  public getFilms(): Observable<FilmsResultInterface> {

    if (this.cachedFilms) {
      return of(this.cachedFilms);  // Повертаємо кеш
    }

    return this.http.get<FilmsResultInterface>('https://swapi.dev/api/films').pipe(
      tap(films => {
        this.cachedFilms = films;
      })
    );
  }

  public getAllCharacters(): Observable<CharacterInterface[]> {
    let allCharacters: CharacterInterface[] = [];
    let nextPageUrl = 'https://swapi.dev/api/people/';

    return new Observable<CharacterInterface[]>((observer) => {
      const getNextPage = (url: string) => {
        this.http.get<CharacterResponseInterface>(url).pipe(
          tap((response) => {
            allCharacters = [...allCharacters, ...response.results];
            if (response.next) {
              getNextPage(response.next);
            } else {
              observer.next(allCharacters);
              observer.complete();
            }
          }),
        ).subscribe();
      };
      getNextPage(nextPageUrl);
    });

  }
}
