import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../auth/login/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './landing-base.component.html',
  styleUrls: ['./landing-base.component.scss', './toolbar.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private loginSubscription: Subscription;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.getLoginState().subscribe((login) => {
      if (login.token && login.email) {
        this.router.navigateByUrl('/centy');
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
