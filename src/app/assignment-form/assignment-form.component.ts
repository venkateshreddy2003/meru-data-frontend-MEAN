import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AssignmentService } from '../services/assignment.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css'],
})
export class AssignmentFormComponent {
  assignmentForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _assignmentServics: AssignmentService,
    private _dialogRef: MatDialogRef<AssignmentFormComponent>,
    private _coreService: CoreService
  ) {
    this.assignmentForm = this._fb.group({
      name: '',
      subject: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    });
  }
  formSubmit() {
    console.log(this.assignmentForm.value);
    if (this.assignmentForm.valid) {
      this._assignmentServics
        .addAssignment(this.assignmentForm.value)
        .subscribe({
          next: (val: any) => {
            // alert('assignment added successfully');
            this._coreService.openSnackBar('Assignment added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    }
  }
}
