import { CadastroComponent } from './cadastro-usuarios/cadastro.component';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalheUsuariosComponent } from './detalhe-usuarios/detalhe-usuarios.component';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ],
  declarations: [
    ListaUsuariosComponent,
    CadastroComponent,
    DetalheUsuariosComponent
  ]
})
export class UsuariosModule { }
