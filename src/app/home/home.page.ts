import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
  import {decode} from "base64-arraybuffer";
  import * as moment from 'moment';
import { UploadService } from '../services/upload.service';
import { ThisReceiver } from '@angular/compiler';

const { Camera, Filesystem, Storage } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit{

  URL;
  STATUS;
  K;

  constructor(private uploadSer: UploadService
    ) {}
  ngOnInit(): void {
    this.getTheUrl(); 

  }
  ngAfterViewInit(): void {
  }

  public async addPhotoToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      // allowEditing: true, 
      source: CameraSource.Camera, 
      quality: 100 
    });
    
    const type = capturedPhoto.format;
    console.log(capturedPhoto.path, capturedPhoto.webPath)

    this.STATUS = capturedPhoto.path + ':' + capturedPhoto.webPath;

    const fileRaw = await Filesystem.readFile({
      path: capturedPhoto.path
    });

    // this.STATUS = file;

    this.K = type;
    const blob = new Blob([fileRaw.data], {type: 'image/jpeg'});
    console.log("🚀 ~ file: home.page.ts ~ line 53 ~ HomePage ~ addPhotoToGallery ~ blob", blob);

    const file = new File([blob], "sample.jpeg", {type: 'image/jpeg'});

    this.K += typeof file;
  
    // const blobData = new Blob([new Uint8Array(decode(capturedPhoto.base64String))],{
    //   type: `image/${capturedPhoto.format}`,
    //   });

    // const file = new File([blobData], "Name", {
    //   lastModified: moment().unix(),
    //   type: blobData.type
    // });
    // let file = '';
    // console.log("🚀 ~ file: home.page.ts ~ line 40 ~ HomePage ~ addPhotoToGallery ~ file", file)

    this.uploadSer.uploadImage(file, this.URL).subscribe(r => {
    console.log("🚀 ~ file: home.page.ts ~ line 43 ~ HomePage ~ this.uploadSer.uploadImage ~ r", r)

    this.STATUS = 'SENT';
        
      })

    }
  getTheUrl() {
    this.uploadSer.getThePresignedUrl().subscribe(r => {
      this.URL = r['url'];
      console.log("🚀 ~ file: home.page.ts ~ line 53 ~ HomePage ~ getTheUrl ~ this.URL ", this.URL )
    });
  }
  
    

}
