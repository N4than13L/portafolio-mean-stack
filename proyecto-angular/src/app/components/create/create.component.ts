import { Component, OnInit } from '@angular/core'
import { Project } from 'src/app/models/project'
import { ProjectService } from 'src/app/models/project.service'
import { UploadService } from 'src/app/services/upload.service'
import { Global } from 'src/app/services/global'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})

export class CreateComponent implements OnInit {

  public title: string
  public project: Project
  public saveProject: any
  public status: String = ''
  public filesToUpload: Array<File> | any
  public url: string

  constructor(
    private _proyectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear Proyecto"
    this.project= new Project('','','', '',2010,'', '')
    this.url = Global.url
   }

  ngOnInit(): void {
  }

  onSubmit(form :any){
    // guardar los datos
    this._proyectService.saveProyect(this.project).subscribe(
      response =>{
        if(response.project){
          //subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.saveProject = result.project
              this.status = 'success'
              form.reset()
            })
          }
          else{
            this.saveProject = response.project
            this.status = 'success'
            form.reset()
          }
          
          
        }else{
          this.status = 'failed'
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

}
