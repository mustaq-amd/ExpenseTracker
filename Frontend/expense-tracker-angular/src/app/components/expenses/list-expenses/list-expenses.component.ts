import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseComponent } from '../expense/expense.component';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.css'],
})
export class ListExpensesComponent implements OnInit {
  subjectSubscription: Subscription;
  dataSource: MatTableDataSource<any>;
  searchKey: string;

  constructor(
    private _expenseService: ExpenseService,
    private route: Router,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.subjectSubscription = this.authService.getSubject().subscribe(() => {
      this.ngOnInit();
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    //this._expenseService.welcome().subscribe((data) => console.log(data));
    this.getExpenses();
  }

  getExpenses() {
    this._expenseService.getExpenses().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert('Please Login');
        this.route.navigate(['login']);
      },
      // complete: () => this.route.navigate(['home']),
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'amount',
    'category',
    'date',
    'action',
  ];

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  createExpense() {
    this._expenseService.isUpdate = false;
    this._expenseService.expense = null;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(ExpenseComponent, dialogConfig);
  }

  updateExpense(expense: Expense) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this._expenseService.isUpdate = true;
    this._expenseService.expense = expense;
    this.dialog.open(ExpenseComponent, dialogConfig);
  }

  deleteExpense(expense: Expense) {
    this.dialogService
      .openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this._expenseService.deleteExpense(expense.id).subscribe({
            next: (res) => {
              this.notificationService.success(
                ':: Expense Deleted successfully'
              );
            },
            error: (err) => {
              this.notificationService.warn(':: Expense Deleted Failed');
            },
            complete: () => this.ngOnInit(),
          });
        }
      });
  }
}
