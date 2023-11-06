import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';
import { LoginService } from './login.service';
import { LoginResponse } from './login.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  submitButtonDisabled: boolean = false;

  isDesktopHeight: MediaQueryList;

  private isDesktopHeightListener: () => void;
  private destroyRef = inject(DestroyRef);

  constructor(
    private readonly loginService: LoginService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initialyzeMediaMatcherListener();
    this.initialyzeFormComponents();
  }

  onLogin() {
    this.submitButtonDisabled = true;

    this.loginService.loginRemote({
      email: this.email.value,
      password: this.password.value,
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result: LoginResponse) => {
      this.submitButtonDisabled = false;
      if (!result.success) {
        result.errors.forEach((er: any) => {
          this.snackBar.open(er, 'OK');
        });
      }
    });
  }

  private initialyzeMediaMatcherListener(): void {
    this.isDesktopHeight = this.media.matchMedia('(min-height: 500px)');
    this.isDesktopHeightListener = () => this.changeDetectorRef.detectChanges();
    this.isDesktopHeight.addEventListener('change', this.isDesktopHeightListener);
  }

  private initialyzeFormComponents(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  ngOnDestroy(): void {
    this.isDesktopHeight.removeEventListener('change', this.isDesktopHeightListener);
  }
}
