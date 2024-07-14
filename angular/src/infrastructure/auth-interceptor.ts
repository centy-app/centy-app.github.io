import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState, AuthStateModel } from 'src/app/auth/state/auth.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authState$: Observable<AuthStateModel> = inject(Store).select(AuthState.getAuth);

  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   var token = this.store.selectSnapshot(AuthState.getAuth).token;
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
