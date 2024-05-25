import { getActionTypeFromInstance, NgxsPlugin } from '@ngxs/store';
import { AuthStateModel } from 'src/app/auth/state/auth.state';
import { LogIn, LogOut } from 'src/app/auth/state/auth.actions';

export function authStoragePlugin(state: AuthStateModel, action: LogOut | LogIn, next: any) {
  if (getActionTypeFromInstance(action) === LogIn.type) {
    updateLocalStorage((action as LogIn).payload);
  }

  if (getActionTypeFromInstance(action) === LogOut.type) {
    updateLocalStorage(undefined);
  }

  return next(state, action);
}

function updateLocalStorage(authState: AuthStateModel | undefined) {
  localStorage.setItem('email', authState?.email ?? '');
  localStorage.setItem('token', authState?.token ?? '');
  localStorage.setItem('baseCurrencyCode', authState?.baseCurrencyCode ?? '');
}
