import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { Observable } from 'rxjs';
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
  submitButtonDisabled: boolean = false;

  currencies$: Observable<Currency[]>;
  isLoading$: Observable<boolean>;

  isDesktopHeight: MediaQueryList;
  private isDesktopHeightListener: () => void;

  constructor(
    private readonly currenciesService: CurrenciesService,
    private readonly registerService: RegisterService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initialyzeMediaMatcherListener();
    this.initialyzeFormComponents();

    this.currencies$ = this.currenciesService.getCurrencies();
    this.isLoading$ = this.currenciesService.isLoading();
  }

  onRegister() {
    this.submitButtonDisabled = true;

    this.registerService.registerAndLoginRemote({
      email: this.email.value,
      password: this.password.value,
      baseCurrencyCode: this.currency.value
    }).subscribe((result: LoginResponse) => {
      if (!result.success) {
        this.submitButtonDisabled = false;
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
