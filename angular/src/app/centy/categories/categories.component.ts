import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { MaterialModule } from 'src/material.module';
import { GetCategories } from './state/categories.actions';

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
export class CategoriesComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit() {
    // TODO: Awoid duplicated call to categories on init if it's already populated
    this.store.dispatch(new GetCategories());
  }
}
