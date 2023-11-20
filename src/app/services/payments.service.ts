import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Payment} from "../models/payment.model";
import { Firestore, collection, addDoc, deleteDoc, doc, collectionData} from '@angular/fire/firestore';

const baseUrl = 'http://localhost:8080/payments';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private firestore: Firestore) { }

  getAll(): Observable<Payment[]> {
    const paymentRef = collection(this.firestore, 'payments');
    return collectionData(paymentRef, { idField: 'payment' }) as Observable<Payment[]>;
  }

  /*getById(id: any): Observable<any>{
    return this.http.get(baseUrl+'/${id}')
  }*/

  createNewPayment(payment: Payment) {
    const paymentRef = collection(this.firestore, 'payments');
    return addDoc(paymentRef, payment);
  }

  /*updatePayment(id: any, payment: Payment): Observable<any>{
    return this.http.put<Payment>(baseUrl+'/'+id, payment);
  }*/

  deletePayment(id: string) {
    const paymentRef = doc(this.firestore, `payments/payment`);
    return deleteDoc(paymentRef);
  }

}
