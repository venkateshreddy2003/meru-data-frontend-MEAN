import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AssignmentService } from './services/assignment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './services/core.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _assignmentServics: AssignmentService,
    private _coreService: CoreService
  ) {
    this.getAssignmentList();
  }
  closedList!: any;
  displayedColumns: string[] = [
    'name',
    'subject',
    'startDate',
    'endDate',
    'startTime',
    'endTime',
  ];
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorFirst') paginator1!: MatPaginator;
  @ViewChild('TbSort') TbSort = new MatSort();
  @ViewChild('TbSortOne') TbSortOne = new MatSort();
  ngOnInit(): void {
    this.getAssignmentList();
  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AssignmentFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAssignmentList();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  title = 'Assignment';

  getAssignmentList() {
    this._assignmentServics.getAssignmentList().subscribe({
      next: (res) => {
        const lst = res;
        const open = lst.filter((x: any) => {
          const d = new Date(x.endDate);
          const endTime = x.endTime.split(':');
          d.setHours(endTime[0]);
          d.setMinutes(endTime[1]);
          return d > new Date();
        });
        open.forEach((x: any) => {
          const endTime = x.endTime.split(':');
          const startTime = x.startTime.split(':');
          let hours = endTime[0]; // gives the value in 24 hours format
          let AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12;
          let minutes = endTime[1];
          let finalTime = hours + ':' + minutes + ' ' + AmOrPm;
          x.endTime = finalTime;
          hours = startTime[0]; // gives the value in 24 hours format
          AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12;
          minutes = startTime[1];
          finalTime = +hours + ':' + minutes + ' ' + AmOrPm;
          x.startTime = finalTime;
        });
        const closed = lst.filter((x: any) => {
          const d = new Date(x.endDate);
          const endTime = x.endTime.split(':');
          d.setHours(endTime[0]);
          d.setMinutes(endTime[1]);
          return d <= new Date();
        });
        closed.forEach((x: any) => {
          const endTime = x.endTime.split(':');
          const startTime = x.startTime.split(':');
          let hours = endTime[0]; // gives the value in 24 hours format
          let AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12;
          let minutes = endTime[1];
          let finalTime = +hours + ':' + minutes + ' ' + AmOrPm;
          x.endTime = finalTime;
          hours = startTime[0]; // gives the value in 24 hours format
          AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12;
          minutes = startTime[1];
          finalTime = +hours + ':' + minutes + ' ' + AmOrPm;
          x.startTime = finalTime;
        });
        console.log(open);
        console.log('from app comnponent' + closed);
        this.closedList = closed;
        this.dataSource = new MatTableDataSource(open);
        this.dataSource1 = new MatTableDataSource(closed);
        // this.dataSource = res;
        // console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource1.paginator = this.paginator1;
        this.dataSource.sort = this.TbSort;
        this.dataSource1.sort = this.TbSortOne;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
