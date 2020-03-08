import { Component,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector:'stop-training',
    template:`<h1 mat-dialog-title> Are you sure?</h1>
                <div mat-dialog-content>
                    <p>You have already completed {{data.progress}}%</p>
                </div>
                <div mat-dialog-actions>
                    <button mat-button [mat-dialog-close]="true">Yes</button>
                    <button mat-button [mat-dialog-close]="false">No</button>
                </div>`
})
export class StopTrainingComponent {

    constructor(public dialogRef: MatDialogRef<StopTrainingComponent>,@Inject(MAT_DIALOG_DATA) public data){}

    onNoClick(): void {
        this.dialogRef.close();
      }
}