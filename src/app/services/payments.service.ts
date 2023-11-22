import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Payment} from "../models/payment.model";
import { Firestore, collection, addDoc, deleteDoc, doc, collectionData, updateDoc} from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private firestore: Firestore,
    private datePipe: DatePipe) { }

  getAll(): Observable<Payment[]> {
    const paymentRef = collection(this.firestore, 'payments');
    return collectionData(paymentRef, { idField: 'id' }) as Observable<Payment[]>;
  }

  createNewPayment(payment: Partial<Payment>) {
    payment.createdDate = new Date().toString();
    const paymentRef = collection(this.firestore, 'payments');
    return addDoc(paymentRef, payment);
  }
  deletePayment(id: string) {
    const paymentRef = doc(this.firestore, `payments/${id}`);
    return deleteDoc(paymentRef);
  }

  updatePayment(id: string) {
    const paymentRef = doc(this.firestore, `payments/${id}`);
    return updateDoc(paymentRef, {"status": "Paid", "paidDate": new Date().toString()});
  }
}
