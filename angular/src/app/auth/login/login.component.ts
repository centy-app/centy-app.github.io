import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class LoginComponent { }
