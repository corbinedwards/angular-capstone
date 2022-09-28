import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {

  constructor(
    private primeMessageService: MessageService
  ) { }

  successMessage(detail: string): void {
    this.primeMessageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
      life: 10000
    });
  }

  errorMessage(summary: string, detail: string): void {
    this.primeMessageService.add({
      severity: 'error', 
      summary,
      detail,
      life: 10000
    });
    console.log(detail);
  }
}
