import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DBFile } from './dbfile';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  // private filesUrl = 'http://localhost:5000/api/files';
  private filesUrl =
    'https://heroku-spring-boot-2681ceda9868.herokuapp.com/api/images';

  uploadFile(formData: FormData): Observable<Object> {
    return this.http.post(this.filesUrl, formData);
  }

  getFiles(): Observable<DBFile[]> {
    return this.http.get<DBFile[]>(this.filesUrl);
  }

  deleteFile(fileUrl: string): Observable<Object> {
    return this.http.delete(fileUrl);
  }
}
