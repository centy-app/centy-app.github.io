import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryTree, CreateCategoryRequest, UpdateCategoryRequest } from './categories.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesUrl = environment.baseApiUrl + 'categories';

  constructor(private http: HttpClient) { }

  createCategory(category: CreateCategoryRequest): Observable<void> {
    return this.http.post<void>(this.categoriesUrl, category);
  }

  getCategories(): Observable<CategoryTree[]> {
    return this.http.get<CategoryTree[]>(this.categoriesUrl);
  }

  updateCategory(id: string, category: UpdateCategoryRequest): Observable<void> {
    return this.http.patch<void>(`${this.categoriesUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.categoriesUrl}/${id}`);
  }

  createTopLevelCategory(type: number, currencyCode: string): Observable<void> {
    const newCategory = {
      parentId: null,
      type: type,
      name: 'New Top Level Category',
      currencyCode: currencyCode,
      iconId: '00000000-0000-0000-0000-000000000000' // empty guid
    };
    return this.createCategory(newCategory);
  }

  createTopLevelSpendingCategory(currencyCode: string): Observable<void> {
    const newCategory = {
      parentId: this.generateGuid(),
      type: 0,
      name: 'New Top Level Spending Category',
      currencyCode: currencyCode,
      iconId: '00000000-0000-0000-0000-000000000000' // empty guid
    };
    return this.createCategory(newCategory);
  }

  createTopLevelAssetCategory(currencyCode: string): Observable<void> {
    const newCategory = {
      parentId: this.generateGuid(),
      type: 1,
      name: 'New Top Level Asset Category',
      currencyCode: currencyCode,
      iconId: '00000000-0000-0000-0000-000000000000' // empty guid
    };
    return this.createCategory(newCategory);
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
