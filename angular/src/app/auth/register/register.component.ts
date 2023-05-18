import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { Observable, catchError, mergeMap, of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Currency } from 'src/app/centy/currencies/state/currencies.models';
import { CurrenciesService } from 'src/app/centy/currencies/currencies.service';
import { RegisterService } from './register.service';
import { LoginResponse } from '../login/login.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;
  confirm: FormControl;
  currency: FormControl;

  currencies$: Observable<Currency[]>;
  isLoading$: Observable<boolean>;

  isDesctopHeight: MediaQueryList;
  private isDesctopHeightListener: () => void;

  constructor(
    private readonly currenciesService: CurrenciesService,
    private readonly registerService: RegisterService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isDesctopHeight = this.media.matchMedia('(min-height: 700px)');
    this.isDesctopHeightListener = () => this.changeDetectorRef.detectChanges();
    this.isDesctopHeight.addEventListener('change', this.isDesctopHeightListener);

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

    this.currencies$ = this.currenciesService.getCurrencies();
    this.isLoading$ = this.currenciesService.isLoading();
  }

  private createCompareValidator(password: AbstractControl, confirm: AbstractControl) {
    return () => {
      if (password.value !== confirm.value) {
        return { match_error: 'Password should match' };
      }

      return null;
    };
  }

  onRegister() {
    this.registerService.registerAndLoginRemote({
      email: this.email.value,
      password: this.password.value,
      baseCurrencyCode: this.currency.value
    })
    .subscribe((result: LoginResponse) => {
      if (result.success) {
        console.warn(result);
        // TODO: save to state
      } else {
        result.errors.forEach((er: any) => {
          this.snackBar.open(er, 'OK');
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.isDesctopHeight.removeEventListener('change', this.isDesctopHeightListener);
  }
}
