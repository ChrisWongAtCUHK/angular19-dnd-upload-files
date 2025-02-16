import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { serialize } from 'object-to-formdata';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileUploadService } from '../file-upload.service';
import { FilesComponent } from '../files/files.component';
import { DBFile } from '../dbfile';

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule, NgIf, MatProgressSpinnerModule, FilesComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  files: DBFile[] = [];
  constructor(private fileUploadService: FileUploadService) {}

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  #hotToastService = inject(HotToastService);

  allowedFileTypes = ALLOWED_FILE_TYPES;

  isLoading = true;
  fileUrl!: string | null;
  uploadFile!: File | null;

  ngOnInit(): void {

    this.getFiles();
  }

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
    this.isLoading = true;

    const formData = serialize({
      image: this.uploadFile,
    });
    // logic to upload file
    this.fileUploadService.uploadFile(formData).subscribe((r) => {
      console.log(r);
      this.isLoading = false;
      this.getFiles();
    });
  }

  getFiles(): void {
    this.fileUploadService.getFiles().subscribe((files) => {
      this.files = files;
      this.isLoading = false;
    });
  }
}
