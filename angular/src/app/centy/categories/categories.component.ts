import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class CategoriesComponent { }
