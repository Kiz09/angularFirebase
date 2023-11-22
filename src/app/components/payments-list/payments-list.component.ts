import { Component, inject, OnInit } from '@angular/core';
import { Payment } from "../../models/payment.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';
import { PaymentsService } from 'src/app/services/payments.service';
import { Observable } from 'rxjs/internal/Observable';
import { CurrencyList } from 'src/app/models/types';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html'
})
export class PaymentsListComponent implements OnInit {


  constructor(
    private paymentService: PaymentsService,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private messageService: MessageService
  ) { }

  paymentsList$?: Observable<Payment[]>;
  display = false;

  selectedCurrency: any = null;
  currencies = CurrencyList.concat();

  ngOnInit() {
    this.paymentsList$ = this.paymentService.getAll();
    console.log("Observable");
    console.log(this.paymentsList$);
  }

  async deletePayment(id: string) {
    const response = await this.paymentService.deletePayment(id);
    console.log(response);
  }

  async updatePayment(id: string) {
    const response = await this.paymentService.updatePayment(id);
  }

  async createNewPayment(payment: Payment) {
    const response = await this.paymentService.createNewPayment(payment);
    console.log(response);
  }

  public form: FormGroup = this.formBuilder.group({
    payerEmail: ['', [Validators.required, Validators.email]],
    currency: ['', [Validators.required]],
    amount: ['0', [Validators.required, Validators.min(0)]]
  });



}
