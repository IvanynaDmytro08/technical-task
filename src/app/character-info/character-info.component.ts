import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {FilmState} from '../store/store.state';
import {CharacterInterface} from '../interfaces/character.interface';
import {selectCharacterByName} from '../store/store.actions';
import {selectFilms, selectSelectedCharacter} from '../store/store.selectors';
import {FilmInterface} from '../interfaces/film.interface';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss']
})
export class CharacterInfoComponent implements OnInit {
  id!: number;
  character!: CharacterInterface | null;
  filmsForCharacter: string[] = [];
  films: FilmInterface[] | null = [];
  idFilmInUrl: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<FilmState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const characterName = this.route.snapshot.paramMap.get('name');

    if (characterName) {
      this.store.dispatch(selectCharacterByName({name: characterName}));

      this.store.select(selectSelectedCharacter).subscribe((character) => {
        this.character = character;
        this.processFilms();
      });
    }

    this.store.select(selectFilms).subscribe((films) => {
      this.films = films;
      this.processFilms();
    });
  }

  processFilms(): void {
    if (this.character && this.films) {
      // need for correct show
      this.filmsForCharacter = [];
      this.idFilmInUrl = [];

      // get id
      this.character.films.map((value) => {
        this.idFilmInUrl.push(+value.slice(-2, -1));
      });

      // check when id in url === episode_id
      this.films.map((film) => {
        this.idFilmInUrl.map((episodeId) => {
          if (film.episode_id === episodeId) {
            this.filmsForCharacter.push(film.title);
          }
        });
      });
    }
  }

  navigateToDetailFilm(name: string): void {
    for (let i = 0; i < this.films!.length; i++) {
      if (this.films![i].title === name) this.id = this.films![i].episode_id;
    }
    !this.router.navigate([`home-page/${this.id}`]);
  }
}
