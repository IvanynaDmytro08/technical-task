import {Component, OnInit} from '@angular/core';
import {FilmInterface} from "../interfaces/film.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FilmState} from "../store/store.state";
import {getCharacters, selectFilmById} from "../store/store.actions";
import {
  selectCharacters,
  selectCharactersLoading,
  selectSelectedFilm
} from "../store/store.selectors";
import {AsyncPipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {CharacterInterface} from "../interfaces/character.interface";

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    UpperCasePipe
  ],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})
export class FilmDetailComponent implements OnInit {

  filmDetail!: FilmInterface | null;
  charactersInFilm: string[] = [];
  characters!: CharacterInterface[] | null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private store: Store<FilmState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const filmId = this.route.snapshot.paramMap.get('id');

    if (filmId) {
      this.store.dispatch(selectFilmById({id: +filmId}));
      this.store.dispatch(getCharacters());

      this.store.select(selectCharactersLoading).subscribe(isLoading => {
        this.isLoading = isLoading;  // Оновлюємо статус завантаження
      });

      this.store.select(selectSelectedFilm).subscribe((film) => {
        this.filmDetail = film;
        this.processCharacters();
      });


      this.store.select(selectCharacters).subscribe((characters) => {
        this.characters = characters;
        this.processCharacters();
      });
    }
  }

  processCharacters(): void {
    if (this.filmDetail && this.characters) {
      this.isLoading = false;
      this.charactersInFilm = [];

      const filmCharacterUrls = this.filmDetail.characters ?? [];

      this.characters.forEach((character: any) => {
        if (filmCharacterUrls.includes(character.url)) {
          this.charactersInFilm.push(character.name);
        }
      });
    }
  }

  navigateToInfoCharacter(name: string) {
    this.router.navigate([`/character/${name}`]);
  }

  navigateToFilmLists() {
    this.router.navigate(['home-page']);
  }
}
