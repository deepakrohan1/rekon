import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }


  headers = new HttpHeaders().append('Content-Type', 'image/jpeg')

  getThePresignedUrl() {
    return this.http.get('https://kq18gjmboi.execute-api.us-east-1.amazonaws.com/Prod/hello');
  }

  uploadImage(image, url) {
  console.log("🚀 ~ file: upload.service.ts ~ line 19 ~ UploadService ~ uploadImage ~ url", url)

    var r = new FileReader();
    r.onload = function(e) { 
      image.binary = r.result
    }
    r.readAsArrayBuffer(image);
    console.log(r);

    console.log("🚀 ~ file: upload-service.service.ts ~ line 14 ~ UploadServiceService ~ uploadImage ~ image", image)
    return this.http.put(
      url,
      r,
      {headers: this.headers}); 

  }
}
