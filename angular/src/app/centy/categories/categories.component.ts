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
import { CategoriesService } from './categories.service';

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

  spendingTreeControl = new NestedTreeControl<CategoryTree>(node => node.children);
  spendingDataSource = new MatTreeNestedDataSource<CategoryTree>();

  assetsTreeControl = new NestedTreeControl<CategoryTree>(node => node.children);
  assetsDataSource = new MatTreeNestedDataSource<CategoryTree>();

  spendingCategories$: Observable<CategoryTree[]> = inject(Store).select(CategoriesState.getSpendingCategories);
  assetsCategories$: Observable<CategoryTree[]> = inject(Store).select(CategoriesState.getAssetsCategories);
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store, private categoriesService: CategoriesService) { 
    this.spendingCategories$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(categories => {
      this.spendingDataSource.data = categories;
      this.expandAllNodes(this.spendingTreeControl, categories);
    });

    this.assetsCategories$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(categories => {
      this.assetsDataSource.data = categories;
      this.expandAllNodes(this.assetsTreeControl, categories);
    });
  }

  hasChild = (_: number, node: CategoryTree) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.store.dispatch(new GetCategories());
  }

  onCreateSubCategory(node: CategoryTree) {
    const newCategory = {
      parentId: node.id,
      type: node.type,
      name: 'New Subcategory',
      currencyCode: node.currencyCode,
      iconId: '00000000-0000-0000-0000-000000000000' // empty guid
    };
    this.categoriesService.createCategory(newCategory).subscribe(() => {
      this.store.dispatch(new GetCategories());
    });
  }

  onDeleteCategory(node: CategoryTree) {
    this.categoriesService.deleteCategory(node.id).subscribe(() => {
      this.store.dispatch(new GetCategories());
    });
  }

  private expandAllNodes(treeControl: NestedTreeControl<CategoryTree>, nodes: CategoryTree[]) {
    nodes.forEach(node => {
      treeControl.expand(node);
      if (node.children) {
        this.expandAllNodes(treeControl, node.children);
      }
    });
  }
}
