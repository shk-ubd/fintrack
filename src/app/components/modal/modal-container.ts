import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CustomButton } from '../custom-button/custom-button';

export interface ModalData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger';
  closable?: boolean;
  isConfirmDialog?: boolean;
}

@Component({
  selector: 'app-modal-container',
  imports: [MatDialogModule, MatIconModule, CustomButton],
  templateUrl: './modal-container.html',
  styleUrl: './modal-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainer {
  readonly dialogRef = inject(MatDialogRef<ModalContainer>);
  readonly data = inject<ModalData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
