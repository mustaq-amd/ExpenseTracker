import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  expense = new Expense();
  isUpdate: boolean = false;

  constructor(
    private dialog: MatDialog,
    private expenseService: ExpenseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.expenseService.isUpdate) {
      this.isUpdate = true;
      this.expense = this.expenseService.expense;
    }
  }

  onSubmit(expenseformData) {
    if (expenseformData.valid) {
      if (this.isUpdate) {
        this.updateExpense(this.expense);
        this.onClose();
      } else {
        this.createExpense(this.expense);
        this.onClose();
      }
    }
  }

  onClear(expenseformData) {
    expenseformData.reset();
  }

  onClose() {
    this.dialog.closeAll();
    this.isUpdate = false;
  }

  createExpense(expense: Expense) {
    this.expenseService.createExpense(this.expense).subscribe({
      next: (res) => {
        this.notificationService.success(':: Expense Created successfully');
      },
      error: (err) => {
        this.notificationService.warn(':: Expense Created Failed');
      },
      complete: () => window.location.reload(),
    });
  }

  updateExpense(expense: Expense) {
    this.expenseService.updateExpense(this.expense).subscribe({
      next: (res) => {
        this.notificationService.success(':: Expense Updated successfully');
      },
      error: (err) => {
        this.notificationService.warn(':: Expense Updated Failed');
      },
      //complete: () => window.location.reload(),
    });
  }
}
