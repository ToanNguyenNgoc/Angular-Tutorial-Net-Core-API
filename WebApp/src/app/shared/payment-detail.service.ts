import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDetail } from './payment-detail.model';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  
  constructor(private http: HttpClient) { }
  readonly rootURL='http://localhost:62024/api/PaymentDetail';
  formData: PaymentDetail= new PaymentDetail();
  list: PaymentDetail[] = [];

  postPaymentDetail(){
    return this.http.post(this.rootURL, this.formData);
  }
  putPaymentDetail(){
    return this.http.put(`${this.rootURL}/${this.formData.PMId}`, this.formData);
  }
  deletePaymentDetail(id: number){
    return this.http.delete(`${this.rootURL}/${id}`)
  }

  refreshList(){
    this.http.get(this.rootURL)
      .toPromise()
      .then(res=>this.list= res as PaymentDetail[]);
  }
}
