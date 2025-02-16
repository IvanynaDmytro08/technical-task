import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {filmsFeatureKey } from "./store/store.state";
import {reducer} from "./store/store.reducer";
import {StoreEffects} from "./store/store.effects";
import {provideHttpClient} from "@angular/common/http";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ [filmsFeatureKey]: reducer }),
    provideEffects([StoreEffects]),
    provideStoreDevtools({ maxAge: 25 }), provideAnimationsAsync()
   ]
};
