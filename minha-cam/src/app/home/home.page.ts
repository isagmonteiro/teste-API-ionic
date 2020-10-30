import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, CameraPhoto} from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient} from '@angular/common/http';
 


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient ) {}
  
  //private async savePicture(cameraPhoto: CameraPhoto) { }

  async tirarfoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    //console.log(image);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    //console.log(image.dataUrl);
    
    function convertDataUrlToBlob(dataUrl): Blob {
      const arr = dataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
  
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
  
      return new Blob([u8arr], {type: mime});
  }
  const isa = convertDataUrlToBlob(image.dataUrl);
  //https://stackoverflow.com/questions/51843950/how-to-convert-base64-dataurl-into-image-in-typescript
  
  //const file = new File([convertDataUrlToBlob(image.dataUrl)], 'imagem', {type: `image/png}`});
    //var imagem = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(this.photo));
    //const savedImageFile = await this.savePicture(image);
    //var imagem = new Blob( this.photo,"image/jpg")

    var formData = new FormData();
    formData.append("image", isa);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aXNhYmVsYW1vbnRlaXJvOmNhbWFyaXNhMDE=");
    //var temp = this.http.post('http://127.0.0.1:5000/prediction', this.photo);
    //const response = await 
    fetch('http://127.0.0.1:5000/prediction', {
      method: 'POST',
      body: formData,
      headers: myHeaders,
      redirect: 'follow'})
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    //console.log(response);
    }
  
}
