import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs"
import { Project } from "../models/project"
import { Global } from "../services/global"


@Injectable()
export class ProjectService{
    public url: String

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url
    }
    
    testService(){
        return 'provando servicio de angular'  
    }
    
    saveProyect(project: Project): Observable<any>{
        let params = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
   
        return this._http.post(this.url + 'Save-project', params, {headers: headers})
    }

    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this._http.get(this.url + 'projects',  {headers: headers})
    }

    getProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this._http.get(this.url + 'project/' + id, {headers: headers})
    }
    DeleteProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this._http.delete(this.url + 'project-delete/' + id, {headers: headers})
    }

    updateProject(project: any): Observable<any>{
        let params  = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.put(this.url + 'project/' + project._id, params, {headers: headers} )

    }

}