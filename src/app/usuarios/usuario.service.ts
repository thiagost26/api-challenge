import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Usuario } from './usuario';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API: string = environment.API + '/api/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<Usuario[]>(this.API)
  }

  loadByID(id: number) {
    return this.http.get<Usuario>(`${this.API}/${id}`);
  }

  remove(usuario: Usuario) : Observable<any>{
    return this.http.delete<any>(`${this.API}/${usuario.id}`);
  }

  salvar(usuario: Usuario) : Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API}`, usuario);
  }

  atualizar(usuario: Usuario) : Observable<any> {
    console.log('usuario no service: ', usuario);
    return this.http.put<Usuario>(`${this.API}/${usuario.id}`, usuario);
  }

  getUsuarioById(id: number) : Observable<Usuario> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  upload(formData: FormData, usuario: Usuario) : Observable<any> {
    return this.http.put(`${this.API}/${usuario.id}/foto`, formData);
  }

}
