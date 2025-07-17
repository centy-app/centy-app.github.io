import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class GlobalErrorEffects {
  logErrors$ = createEffect(
    () => this.actions$.pipe(
      filter(action => typeof action.type === 'string' && action.type.endsWith('Error')),
      tap(action => {
        // TODO: Replace with a notification service if desired
        console.error('[GlobalErrorEffects]', action);
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
