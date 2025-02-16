import {Component, OnInit} from '@angular/core';
import {FilmInterface} from "../interfaces/film.interface";
import {Store} from "@ngrx/store";
import {selectFilms, selectFilmsIsError, selectFilmsIsLoading} from "../store/store.selectors";
import {getFilms} from "../store/store.actions";
import {FilmState} from "../store/store.state";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  nameFilms = new MatTableDataSource<FilmInterface>([]);
  isLoading = false;
  isError = false;

  constructor(private store: Store<FilmState>, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.store.dispatch(getFilms());

    this.store.select(selectFilmsIsLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.store.select(selectFilmsIsError).subscribe(isError => {
      this.isError = isError;
    });

    this.store.select(selectFilms).subscribe((films) => {
      this.nameFilms.data = films ?? [];
    });
  }

  goToFilmDetail(id: number): void {
    this.router.navigate([`home-page/${id}`]);
  }

}
