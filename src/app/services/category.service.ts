import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:3000/categories';

  constructor(private http: HttpClient) {}

  // method to add a new category (admin only)
  addCategory(categoryData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .post<any>(`${this.apiUrl}/`, categoryData, { headers })
      .pipe(catchError(this.handleError));
  }

  // method to update a category by ID (admin only)
  updateCategory(
    categoryId: number,
    categoryData: any,
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .patch<any>(`${this.apiUrl}/${categoryId}`, categoryData, { headers })
      .pipe(catchError(this.handleError));
  }

  // method to delete a category by ID (admin only)
  deleteCategory(categoryId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.http
      .delete<any>(`${this.apiUrl}/${categoryId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // method to get popular categories (public access)
  getPopularCategories(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/popular`)
      .pipe(catchError(this.handleError));
  }

  // Method to get all categories (public access)
  getAllCategories(pageNum: number = 1, token: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}?pageNum=${pageNum}`)
      .pipe(catchError(this.handleError));
  }
  getcategoriesNames() {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe();
  }

  // Method to handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
