import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FilesComponent } from './files/files.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FileUploadComponent, FilesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular19-dnd-upload-files';
}
