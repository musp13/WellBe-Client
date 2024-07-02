import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-webrtc-video-callinfo-dialog',
  templateUrl: './webrtc-video-callinfo-dialog.component.html',
  styleUrl: './webrtc-video-callinfo-dialog.component.css'
})
export class WebrtcVideoCallinfoDialogComponent {
  dialogRef= inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  _snackbar= inject(MatSnackBar);

  showCopiedSnackBar(){
    this._snackbar.open('Peer ID Copied!', 'Hurrah', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
