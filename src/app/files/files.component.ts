import { Component, Input } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-files',
  imports: [NgFor],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent {
  @Input() files: string[] = [];
  constructor(private fileUploadService: FileUploadService) {}
}
