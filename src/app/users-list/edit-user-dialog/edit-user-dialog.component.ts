import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {EditUserDialogData} from "../../interfaces/editUserDialogData.interface";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatDialogClose, MatDialogTitle, MatDialogActions,
    MatButton],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent implements OnInit {
  readonly form = this.getUserFormGroup();


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent, User>,
    @Inject(MAT_DIALOG_DATA) public readonly data: EditUserDialogData,
  ) {
  }

  private getUserFormGroup() {
    return this.fb.group({
      id: [this.data.user?.id || null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: [''],
      }),
    })
  }

  private initFormValue(): void {
    const user = this.data.user;

    if (user) {
      this.form.patchValue(user);
    }
  }

  ngOnInit(): void {
    this.initFormValue();
  }

  onSave() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close({
        ...this.data.user,
        ...this.form.getRawValue() as User
      })
    }
  }
}
