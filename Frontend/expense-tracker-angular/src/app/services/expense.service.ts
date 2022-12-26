import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Expense } from '../models/expense';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  public isUpdate: boolean = false;
  public expense: Expense;

  //private baseUrl: string = "https://expense-manager-api-production.up.railway.app/api/v1/";

  private baseUrl: string = 'http://localhost:5000/api/v1/';

  constructor(private _httpClient: HttpClient) {}

  welcome(): Observable<any> {
    return this._httpClient
      .get(this.baseUrl, { responseType: 'text' })
      .pipe(map((response: any) => response));
  }

  getExpenses(): Observable<Expense[]> {
    return this._httpClient
      .get<Expense[]>(this.baseUrl + 'expenses')
      .pipe(map((response: any) => response));
  }
  createExpense(expense:Expense): Observable<any>{
    return this._httpClient.post(this.baseUrl+'expenses',expense,{'headers':headers})
  }

  updateExpense(expense: Expense): Observable<any>{
    return this._httpClient.put(this.baseUrl+'expenses'+'/'+expense.id,expense,{'headers':headers})
  }

  deleteExpense(id: number): Observable<any>{
    return this._httpClient.delete(this.baseUrl+'expenses'+'?id='+id,{'headers':headers});
  }
}
