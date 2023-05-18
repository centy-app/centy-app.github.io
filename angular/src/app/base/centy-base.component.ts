import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../auth/login/login.service';

@Component({
  selector: 'app-centy',
  templateUrl: './centy-base.component.html',
  styleUrls: ['./centy-base.component.scss', './toolbar.scss']
})
export class CentyComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isMobileWidth: MediaQueryList;
  private isMobileWidthListener: () => void;
  private loginSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.isMobileWidth = this.media.matchMedia('(max-width: 600px)');
    this.isMobileWidthListener = () => this.changeDetectorRef.detectChanges();
    this.isMobileWidth.addEventListener('change', this.isMobileWidthListener);

    this.loginSubscription = this.loginService.getLoginState().subscribe((login) => {
      if (!login.token && !login.email) {
        this.router.navigateByUrl('');
      }
    });
  }

  public onNavClick() {
    if (this.isMobileWidth.matches) {
      this.sidenav.close();
    }
  }

  public onLogoutClick() {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.isMobileWidth.removeEventListener('change', this.isMobileWidthListener);
    this.loginSubscription.unsubscribe();
  }
}
