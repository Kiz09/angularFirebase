import { Component, inject, OnInit } from '@angular/core';
import { Payment } from "../../models/payment.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';
import { PaymentsService } from 'src/app/services/payments.service';
import { Observable } from 'rxjs';
import { CurrencyList } from 'src/app/models/types';



@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html'
})
export class PaymentsListComponent implements OnInit {

  paymentsList$?: Observable<Payment[]>;
  display = false;

  selectedCurrency: any = null;
  currencies = CurrencyList.concat();


  ngOnInit() {
    this.paymentsList$ = this.paymentService.getAll();
  }

  async deletePayment(payerEmail: string) {
    const response = await this.paymentService.deletePayment(payerEmail);
    console.log(response);

    /*var numberValue = Number(id);
    this.paymentService.deletePayment(numberValue).subscribe({
      next: () => { this.getAll() },
      error: (err: HttpResponse<HttpStatusCode>) => { this.messageService.add({ severity: 'error', summary: 'Error'}) }
    })*/
  }

  getAll() {
    this.paymentsList$ = this.paymentService.getAll();
  }


  updatePayment(id: string, payment: Payment) {
    /*var numberValue = Number(id);
    this.paymentService.updatePayment(numberValue, payment).subscribe({
      next: () => { this.getAll() },
      error: (err: HttpResponse<HttpStatusCode>) => { this.messageService.add({ severity: 'error', summary: 'Error' }) }
    })*/
  }

  async createNewPayment(payment: Payment) {
    console.log(this.form.value);
    const response = await this.paymentService.createNewPayment(this.form.value);
    console.log(response);

    /*this.paymentService.createNewPayment(payment).subscribe({
      next: () => { this.getAll() },
      error: (err: HttpResponse<HttpStatusCode>) => { this.messageService.add({ severity: 'error', summary: 'Error'}) }
    })*/
  }

  public form: FormGroup = this.formBuilder.group({
    payerEmail: ['', [Validators.required, Validators.email]],
    currency: ['', [Validators.required]],
    amount: ['0', [Validators.required, Validators.min(0)]]
  });

  constructor(
    private paymentService: PaymentsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }


}
