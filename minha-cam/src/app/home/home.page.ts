import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, CameraPhoto} from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient} from '@angular/common/http';
import { url } from 'inspector';
import { createTokenForExternalReference, createTokenForReference } from '@angular/compiler/src/identifiers';
 


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Image: HTMLImageElement;
  //ItemPreview: HTMLImageElement;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient ) {}
  

  async tirarfoto() {
    const imagem = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    //console.log(image);
    //this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
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
  const isa = convertDataUrlToBlob(imagem.dataUrl);
  //https://stackoverflow.com/questions/51843950/how-to-convert-base64-dataurl-into-image-in-typescript
  
  //const file = new File([convertDataUrlToBlob(image.dataUrl)], 'imagem', {type: `image/png}`});
    //var imagem = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(this.photo));
    //const savedImageFile = await this.savePicture(image);
    //var imagem = new Blob( this.photo,"image/jpg")

    var formData = new FormData();
    formData.append("image", isa);
    //var image = new Image();
    var img;
    //var jojo = new Blob ();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aXNhYmVsYW1vbnRlaXJvOmNhbWFyaXNhMDE=");
    const response = await fetch('http://127.0.0.1:5000/prediction', {
      method: 'POST',
      body: formData,
      headers: myHeaders,
      redirect: 'follow'})
      .then(response => response.body
            )
      .then(function(response) {
        return response.text();
      }).then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data);  
        img = data;
      });

      
      //var imgsrc = btoa(unescape(encodeURIComponent(img)));
     // console.log(imgsrc);
      
      //var joao = new Image(1, 1); // width, height values are optional params 
      //joao.src = imgsrc;
      //console.log(joao);

      //Codificar imagem binária em base64
        function base64_encode (stringToEncode) { 
        var encodeUTF8string = function (str) {
          // first we use encodeURIComponent to get percent-encoded UTF-8,
          // then we convert the percent encodings into raw bytes which
          // can be fed into the base64 encoding algorithm.
          return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes (match, p1) {
              return String.fromCharCode('0x' + p1)
            })
        }
      
        if (typeof window !== 'undefined') {
          if (typeof window.btoa !== 'undefined') {
            return window.btoa(encodeUTF8string(stringToEncode))
          }
        } else {
          return new Buffer(stringToEncode).toString('base64')
        }
      
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        var o1
        var o2
        var o3
        var h1
        var h2
        var h3
        var h4
        var bits
        var i = 0
        var ac = 0
        var enc = ''
        var tmpArr = []
      
        if (!stringToEncode) {
          return stringToEncode
        }
      
        stringToEncode = encodeUTF8string(stringToEncode)
      
        do {
          // pack three octets into four hexets
          o1 = stringToEncode.charCodeAt(i++)
          o2 = stringToEncode.charCodeAt(i++)
          o3 = stringToEncode.charCodeAt(i++)
      
          bits = o1 << 16 | o2 << 8 | o3
      
          h1 = bits >> 18 & 0x3f
          h2 = bits >> 12 & 0x3f
          h3 = bits >> 6 & 0x3f
          h4 = bits & 0x3f
      
          // use hexets to index into b64, and append result to encoded string
          tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
        } while (i < stringToEncode.length)
      
        enc = tmpArr.join('')
      
        var r = stringToEncode.length % 3
      
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
      }

      var final = base64_encode (img);
      //console.log(final);
      
      
      console.log(final);
      //console.log("<img src='data:image/jpeg;base64," + base64_encode(img) + "' />");*/









      //console.log(response);
      

      /*.then(response => {
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                    controller.close();
                    return;
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          }  
        })
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      //.then(pepe => console.log(jojo=pepe))
      .then(blob => URL.createObjectURL(blob))
      .then(url => console.log(image.src = url))
      
      console.log(image);*/
      /*const blobToImage = (blob) => {
        return new Promise(resolve => {
          const url = URL.createObjectURL(blob)
          let img = new Image()
          img.onload = () => {
            URL.revokeObjectURL(url)
            resolve(img)
          }
          img.src = url
        })
      }
      console.log(blobToImage(jojo));*/

      
      
    
      //const reader = response.body.getReader();
      //var bytes = [reader]; // get from server
      //var uints = new Uint8Array(bytes);
      //var base64 = btoa(String.fromCharCode(null, uints));
      //console.log(response);
      //var url = 'data:image/jpeg;base64,' + reader;


      //image.src = "data:image/jpg;base64," + response;
      

      
      
    /*  function ImagetoPrint(source)
    {
        return "<html><head><scri"+"pt>function step1(){\n" +
                "setTimeout('step2()', 10);}\n" +
                "function step2(){window.print();window.close()}\n" +
                "</scri" + "pt></head><body onload='step1()'>\n" +
                "<img src='" + source + "' /></body></html>";
    }
      
      
      function PrintImage(source)
      {
          var Pagelink = "about:blank";
          var pwa = window.open(Pagelink, "_new");
          pwa.document.open();
          pwa.document.write(ImagetoPrint(source));
          pwa.document.close();
      }

      PrintImage(image);*/
      

     
      //.catch(err => console.error(err));
      
      /*
      .then(result => console.log(result))
      .catch(error => console.log('error', error));*/
      
    //console.log(response);
    
    }
  
}
