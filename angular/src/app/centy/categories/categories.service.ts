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
}
