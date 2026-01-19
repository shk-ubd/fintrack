import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    options?: {
      params?: Record<string, any>;
      headers?: HttpHeaders;
    }
  ): Observable<T> {
    return this.http.get<T>(url, {
      params: options?.params,
      headers: options?.headers,
    });
  }

  post<T>(
    url: string,
    body: unknown,
    options?: {
      headers?: HttpHeaders;
    }
  ): Observable<T> {
    return this.http.post<T>(url, body, {
      headers: options?.headers,
    });
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(url, body);
  }

  patch<T>(url: string, body: unknown): Observable<T> {
    return this.http.patch<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
