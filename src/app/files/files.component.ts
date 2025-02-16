import { Component } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-files',
  imports: [NgFor],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent {
  files: string[] = [];
  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.fileUploadService
      .getFiles()
      .subscribe((files) => (this.files = files));
  }
}
