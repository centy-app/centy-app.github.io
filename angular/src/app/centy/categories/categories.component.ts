import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetCategories } from './state/categories.actions';
import { CategoriesState } from './state/categories.state';
import { MaterialModule } from 'src/material.module';
import { CategoryTree } from './categories.models';

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

  treeControl = new NestedTreeControl<CategoryTree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<CategoryTree>();

  categories$: Observable<CategoryTree[]> = inject(Store).select(CategoriesState.getCategories);
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) { 
    this.categories$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(categories => {
      this.dataSource.data = categories;
    });
  }

  hasChild = (_: number, node: CategoryTree) => !!node.children && node.children.length > 0;

  ngOnInit() {
    // TODO: Awoid duplicated call to categories on init if it's already populated
    this.store.dispatch(new GetCategories());
  }
}
