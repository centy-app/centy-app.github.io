import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

@NgModule({
  declarations: [DeleteConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [DeleteConfirmationDialogComponent]
})
export class DeleteConfirmationDialogModule { }
