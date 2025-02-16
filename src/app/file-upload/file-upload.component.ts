import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { serialize } from 'object-to-formdata';
import { FileUploadService } from '../file-upload.service';
import { FilesComponent } from '../files/files.component';
import { DBFile } from '../dbfile';

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule, FilesComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  files: DBFile[] = [];
  constructor(private fileUploadService: FileUploadService) {}

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  #hotToastService = inject(HotToastService);

  allowedFileTypes = ALLOWED_FILE_TYPES;

  isUploading = false;
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
    this.isUploading = true;

    const formData = serialize({
      image: this.uploadFile
    });
    // logic to upload file
    this.fileUploadService
      .uploadFile(formData)
      .subscribe(r => {
        console.log(r)
        this.isUploading = false;
        this.getFiles();
      });
  }

  getFiles(): void {
    this.fileUploadService
      .getFiles()
      .subscribe((files) => {
        this.files = files;
      });
  }
}
