import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/state/app-state.model';
import * as fromAuth from 'src/app/auth/state';

@Component({
  selector: 'app-centy',
  templateUrl: './centy-base.component.html',
  styleUrls: ['./centy-base.component.scss', './toolbar.scss']
})
export class CentyComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isMobileWidth: MediaQueryList;
  private isMobileWidthListener: () => void;
  private authSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initialyzeMediaMatcherListener();
    this.initialyzeLogoutSubscription();
  }

  onNavClick() {
    if (this.isMobileWidth.matches) {
      this.sidenav.close();
    }
  }

  onLogoutClick() {
    //TODO: Replace with styled pop-up
    if (confirm("Are you sure you want to log out?")) {
      this.store.dispatch(fromAuth.logOut());
    }
  }

  private initialyzeLogoutSubscription(): void {
    this.authSubscription = this.store.select((store) => store.authState).subscribe(authState => {
      if (!authState.token && !authState.email) {
        this.router.navigateByUrl('');
      }
    });
  }

  private initialyzeMediaMatcherListener(): void {
    this.isMobileWidth = this.media.matchMedia('(max-width: 600px)');
    this.isMobileWidthListener = () => this.changeDetectorRef.detectChanges();
    this.isMobileWidth.addEventListener('change', this.isMobileWidthListener);
  }

  ngOnDestroy(): void {
    this.isMobileWidth.removeEventListener('change', this.isMobileWidthListener);
    this.authSubscription.unsubscribe();
  }
}
