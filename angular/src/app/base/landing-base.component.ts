import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './landing-base.component.html',
  styleUrls: ['./landing-base.component.scss', './toolbar.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeLoginSubscription();
  }

  private initializeLoginSubscription(): void {
    this.authSubscription = this.authService.getAuthState().subscribe((authState) => {
      if (authState.token && authState.email) {
        this.router.navigateByUrl('/centy');
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
