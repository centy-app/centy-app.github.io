import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectSpendingCategories, selectAssetsCategories } from './state/categories.selectors';
import { getCategories as getCategoriesAction } from './state/categories.actions';
import { MaterialModule } from 'src/material.module';
import { CategoryTree } from './categories.models';
import { CategoriesService } from './categories.service';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { selectDefaultCurrency } from 'src/app/auth/state/auth.selectors';
// If you need selectors, import from 'src/app/auth/state/auth.selectors'

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

  spendingCategories$: Observable<CategoryTree[]> = inject(Store).select(selectSpendingCategories);
  assetsCategories$: Observable<CategoryTree[]> = inject(Store).select(selectAssetsCategories);
  defaultCurrency$: Observable<string> = inject(Store).select(selectDefaultCurrency);
  
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store, private categoriesService: CategoriesService, private dialog: MatDialog) { 
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
    this.store.dispatch(getCategoriesAction());
  }

  onCreateTopLevelSpendingCategory() {
    this.defaultCurrency$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(defaultCurrency => {
      const newCategory = {
        parentId: undefined,
        type: 0,
        name: 'New Top Level Spending',
        currencyCode: defaultCurrency,
        iconId: undefined
      };
      this.categoriesService.createCategory(newCategory).subscribe(() => {
        this.store.dispatch(getCategoriesAction());
      });
    });
  }

  onCreateTopLevelAssetCategory() {
    this.defaultCurrency$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(defaultCurrency => {
      const newCategory = {
        parentId: undefined,
        type: 1,
        name: 'New Top Level Asset',
        currencyCode: defaultCurrency,
        iconId: undefined
      };
      this.categoriesService.createCategory(newCategory).subscribe(() => {
        this.store.dispatch(getCategoriesAction());
      });
    });
  }

  onCreateSubCategory(node: CategoryTree) {
    const newCategory = {
      parentId: node.id,
      type: node.type,
      name: 'New Subcategory',
      currencyCode: node.currencyCode,
      iconId: undefined
    };
    this.categoriesService.createCategory(newCategory).subscribe(() => {
      this.store.dispatch(getCategoriesAction());
    });
  }

  onDeleteCategory(node: CategoryTree) {
    this.categoriesService.deleteCategory(node.id).subscribe(() => {
      this.store.dispatch(getCategoriesAction());
    });
  }

  openDeleteConfirmationDialog(node: CategoryTree): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: { name: node.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteCategory(node);
      }
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
