import {Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {FilmDetailComponent} from "./film-detail/film-detail.component";
import {CharacterInfoComponent} from "./character-info/character-info.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'}, // перенаправлення на home-page
  {path: 'home-page', component: HomePageComponent},
  {path: 'home-page/:id', component: FilmDetailComponent},
  {path: 'character/:name', component: CharacterInfoComponent}
];
