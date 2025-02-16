import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  #hotToastService = inject(HotToastService);

  allowedFileTypes = ALLOWED_FILE_TYPES;

  isUploading = false;
  fileUrl!: string | null;
  uploadFile!: File | null;

  handleChange(event: any) {
    const file = event.target.files[0] as File;

    if (this.allowedFileTypes.indexOf(file?.type) === -1) {
      this.#hotToastService.error('File type is not allowed.');
      this.handleRemovesFile();
      return;
    }

    this.fileUrl = URL.createObjectURL(file);
    this.uploadFile = file;
  }

  handleRemovesFile() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = null;
    }

    this.uploadFile = null;
    this.fileUrl = null;
  }

  handleUploadFile() {
    // logic to upload file
  }
}
