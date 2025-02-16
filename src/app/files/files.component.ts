import { Component, Input } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { NgFor } from '@angular/common';
import { DBFile } from '../dbfile';

@Component({
  selector: 'app-files',
  imports: [NgFor],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent {
  @Input() files: DBFile[] = [];
  constructor(private fileUploadService: FileUploadService) {}

  delete(file: string): void {
    this.files = this.files.filter((h) => h.url !== file);
    this.fileUploadService
      .deleteFile(file)
      .subscribe((response) => { console.log(response)});
  }
}
