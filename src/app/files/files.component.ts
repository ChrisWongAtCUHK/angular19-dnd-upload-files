import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FileUploadService } from '../file-upload.service';
import { DBFile } from '../dbfile';

@Component({
  selector: 'app-files',
  imports: [NgFor, MatListModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent {
  @Input() files: DBFile[] = [];
  constructor(private fileUploadService: FileUploadService) {}

  delete(file: string): void {
    this.files = this.files.filter((h) => h.url !== file);
    this.fileUploadService.deleteFile(file).subscribe((response) => {
      console.log(response);
    });
  }
}
