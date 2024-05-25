import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';

import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { RegisterService } from './register.service';
import { LoginResponse } from '../login/login.models';
import { Currency } from 'src/app/centy/currencies/currencies.models';
import { CurrenciesState } from 'src/app/centy/currencies/state/currencies.state';
import { GetCurrencies } from 'src/app/centy/currencies/state/currencies.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;
  confirm: FormControl;
  currency: FormControl;
  submitButtonDisabled: boolean = false;

  @Select(CurrenciesState.getCurrencies) currencies$: Observable<Currency[]>;
  @Select(CurrenciesState.getIsLoading) isLoading$: Observable<boolean>;

  isDesktopHeight: MediaQueryList;

  private isDesktopHeightListener: () => void;
  private destroyRef = inject(DestroyRef);

  constructor(
    private readonly registerService: RegisterService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly snackBar: MatSnackBar,
    private store: Store) { }

  ngOnInit(): void {
    this.initialyzeMediaMatcherListener();
    this.initialyzeFormComponents();

    this.store.dispatch(new GetCurrencies());
  }

  onRegister() {
    this.submitButtonDisabled = true;

    this.registerService.registerAndLoginRemote({
      email: this.email.value,
      password: this.password.value,
      baseCurrencyCode: this.currency.value
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
    this.isDesktopHeight = this.media.matchMedia('(min-height: 700px)');
    this.isDesktopHeightListener = () => this.changeDetectorRef.detectChanges();
    this.isDesktopHeight.addEventListener('change', this.isDesktopHeightListener);
  }

  private initialyzeFormComponents(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.confirm = new FormControl('', Validators.required);
    this.currency = new FormControl('', Validators.required);

    this.confirm.addValidators(this.createCompareValidator(this.password, this.confirm));

    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirm: this.confirm,
      currency: this.currency
    });
  }

  private createCompareValidator(password: AbstractControl, confirm: AbstractControl) {
    return () => {
      if (password.value !== confirm.value) {
        return { match_error: 'Password should match' };
      }
      return null;
    };
  }

  ngOnDestroy(): void {
    this.isDesktopHeight.removeEventListener('change', this.isDesktopHeightListener);
  }
}
