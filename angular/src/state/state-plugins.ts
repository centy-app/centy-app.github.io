// This file is now obsolete for auth state due to NgRx migration.
// Auth localStorage logic is handled by NgRx effects in auth.effects.ts

import { getActionTypeFromInstance, NgxsPlugin } from '@ngxs/store';

export function authStoragePlugin(state: any, action: any, next: any) {
  if (getActionTypeFromInstance(action) === 'LogIn') {
    updateLocalStorage((action as any).payload);
  } else if (getActionTypeFromInstance(action) === 'LogOut') {
    updateLocalStorage(undefined);
  }

  return next(state, action);
}

function updateLocalStorage(authState: any | undefined) {
  localStorage.setItem('email', authState?.email ?? '');
  localStorage.setItem('token', authState?.token ?? '');
  localStorage.setItem('baseCurrencyCode', authState?.baseCurrencyCode ?? '');
}
