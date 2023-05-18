import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Currency } from 'src/app/centy/currencies/state/currencies.models';
import { Observable, Subscription, isEmpty } from 'rxjs';
import { CurrenciesService } from 'src/app/centy/currencies/currencies.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;
  confirm: FormControl;
  currency: FormControl;
  hidePassword: boolean;

  currencies$: Observable<Currency[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private readonly currenciesService: CurrenciesService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) { 
      this.mobileQuery = media.matchMedia('(min-height: 700px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.confirm = new FormControl('', Validators.required);
    this.currency = new FormControl('', Validators.required);
    this.hidePassword = true;

    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirm: this.confirm,
      currency: this.currency
    });

    this.confirm.addValidators(this.createCompareValidator(this.password,this.confirm));

    this.currencies$ = this.currenciesService.getCurrencies();
    this.isLoading$ = this.currenciesService.isLoading();
  }

  createCompareValidator(password: AbstractControl, confirm: AbstractControl) {
    return () => {
      if (password.value !== confirm.value)
        return { match_error: 'Password should match' };
      return null;
    };
  }

  onRegister() {
    console.warn(this.registerForm.value);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
