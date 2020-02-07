import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { PortalService } from 'src/app/services/portal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  noticia;
  urlP = environment.urlProduccion;
  doc1;
  doc2;
  nomdoc1;
  nomdoc2;
  ext1;
  ext2;
  load;

  public storageDirectory:any;
  
  constructor(navParams: NavParams, private portalService : PortalService,
    public loadingController: LoadingController,
    public sanitizer : DomSanitizer,
    public modalController: ModalController,
    public util: UtilidadesService,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public toastController: ToastController) {

      //console.log("file",this.file.tempDirectory);

      this.util.logVista("Noticia");

      //this.util.mostrarLoading();
      this.noticia = navParams.get("noticia");
      if(this.noticia.Doc1 != "")
      {
        const p = this.noticia.Doc1.split('.');
        const t = this.noticia.Doc1.split('/');
        this.ext1 = p[1];
        this.doc1 = this.urlP+this.noticia.Doc1;
        this.nomdoc1 = t[t.length-1];
      }
      else
      {
        this.doc1 = null;
      }

      if(this.noticia.Doc2 != "")
      {
        const p = this.noticia.Doc2.split('.');
        const t = this.noticia.Doc2.split('/');
        this.ext2 = p[1];
        this.doc2 = this.urlP+this.noticia.Doc2;
        this.nomdoc2 = t[t.length-1];
      }
      else
      {
        this.doc2 = null;
      }

      this.load = true;
      console.log("noticia", this.noticia);

      this.util.cerrarLoadingPublicidad();

     }

  ngOnInit() {
  }

  getMimeType(extension)
  {
    if(extension == "xls")
    {
      return "application/vnd.ms-excel";
    }
    if(extension == "xlsx")
    {
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    if(extension == "doc")
    {
      return "application/msword";
    }
    if(extension == "docx")
    {
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    if(extension == "pdf")
    {
      return "application/pdf";
    }

    return "";

  }

  async download(url) {

    

    console.log("url", url);

    await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => {
        console.log('Has permission?', result.hasPermission);
        if(result.hasPermission ==true)
        {
          this.util.mostrarLoadingNoticia();
          const fileTransfer: FileTransferObject = this.transfer.create();

         

          this.storageDirectory = this.file.externalRootDirectory + 'Download/';
          //this.storageDirectory = 'Download/';
          //const url = 'http://asociaciondefutbol.cl/Content/Archivos/Noticias/DocumentoDePrueba_20190808095235.xlsx';

          var fileName = url.substr(url.lastIndexOf('/') + 1);
          var fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1);

          
          console.log("filename", fileName);
          console.log("fileExtension", fileExtension); 

          fileTransfer.download(url,this.storageDirectory + fileName, true).then((entry) => {
            this.util.cerrarLoading();
            console.log('download complete: ' + entry);

            var mimeType = this.getMimeType(fileExtension);
            
            this.showToastFile(entry.toURL(), mimeType);
            // this.fileOpener
            //   .open(entry.toURL(), mimeType)
            //   .then(() => console.log("File is opened"))
            //   .catch(e => console.log("Error opening file", e));
          }, (error) => {
            this.util.cerrarLoading();
            console.log(error);
          });
        }
        
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );

    
  }

  async showToastFile(url, mimeType)
  {
    var toast = await this.toastController.create({
      message: "Descarga Completa",
      duration: 10000,
      buttons: [
        {
          text: 'Abrir',
          handler: () => {
            console.log('Cancel clicked');
            this.fileOpener
              .open(url, mimeType)
              .then(() => console.log("File is opened"))
              .catch(e =>{
                this.showToast("No se puede abrir el archivo");
                console.log("Error opening file", e)});
          }
        }
      ]

  });


 

  toast.present();
  }

  async showToast(texto)
  {
    var toast = await this.toastController.create({
      message: texto,
      duration: 2000

    });
    toast.present();
  }

}
