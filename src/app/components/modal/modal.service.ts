import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { ModalContainer } from './modal-container';

export interface ModalOptions {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly dialog = inject(MatDialog);

  open<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    options: ModalOptions = {}
  ): MatDialogRef<T, R> {
    const sizeMap = {
      sm: '400px',
      md: '560px',
      lg: '720px',
      xl: '900px',
      full: '95vw',
    };

    const config: MatDialogConfig<D> = {
      width: sizeMap[options.size || 'md'],
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: ['ft-modal', `ft-modal--${options.size || 'md'}`],
      data: {
        title: options.title,
        closable: options.closable ?? true,
        ...(options.data as object),
      } as D,
      autoFocus: true,
      restoreFocus: true,
    };

    return this.dialog.open<T, D, R>(component, config);
  }

  openConfirm(options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'primary' | 'danger';
  }): MatDialogRef<ModalContainer, boolean> {
    return this.open<ModalContainer, unknown, boolean>(ModalContainer, {
      title: options.title,
      size: 'sm',
      data: {
        message: options.message,
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        variant: options.variant || 'primary',
        isConfirmDialog: true,
      },
    });
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
