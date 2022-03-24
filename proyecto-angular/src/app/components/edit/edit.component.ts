import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { ProjectService } from 'src/app/models/project.service';
import { UploadService } from 'src/app/services/upload.service';
import {Router, ActivatedRoute, Params} from "@angular/router"

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService ]
})

export class EditComponent implements OnInit {

  public title: string
  public project: Project | any
  public saveProject: any
  public status: String = ''
  public filesToUpload: Array<File> | any
  public url: string

  constructor(
    private _proyectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = "Crear Proyecto"
    this.project= new Project('','','', '',2010,'', '')
    this.url = Global.url
   }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id']
      this.getProject(id)
    })
  }

   getProject(id: any){
    this._proyectService.getProject(id).subscribe(
      response => {
        this.project = response.project
        // console.log(this.project)
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  onSubmit(form :any){
    // guardar los datos
    this._proyectService.saveProyect(this.project).subscribe(
      response =>{
        if(response.project){

          if(this.filesToUpload){
            //subir la imagen
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.saveProject = result.project
              this.status = 'success'
           
            })
            
          }else{
              this.saveProject = response.project
              this.status = 'success'
          }
        }
          
          else{
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
