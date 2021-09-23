import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { DialogCadastroComponent } from 'src/app/shared/components/dialog-cadastro/dialog-cadastro.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { UsuarioService } from '../usuario.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})


export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuarioSelected!: Usuario;

  colunas = ['foto', 'id', 'username', 'email', 'dataCadastro', 'acoes'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private service: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarContatos();

    // params.subscribe( urlParams => {
    //   this.id = urlParams['id'];
    //   if(this.id) {
    //     this.service
    //       .getClienteById(this.id)
    //       .subscribe(
    //         response => this.cliente = response,
    //         errorResponse => this.cliente = new Cliente()
    //       )
    //   }
    // })
  }

  listarContatos() {
    this.service.list().subscribe( response => {
      this.usuarios = response;
    })
  }

  preparaDelecao(usuario: Usuario): void {
    this.usuarioSelected = usuario;
    const config = {
      data: {
        titulo: `Você tem certeza que deseja excluir o(a) usuário(a) ${this.usuarioSelected.username}?`,
        descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if(opcao) {
        this.service
          .remove(this.usuarioSelected)
          .subscribe(
            response => {
              this.ngOnInit();
              const msgSuccess: string = "Usuário excluído com sucesso!";
              this.snackBar.open(msgSuccess, "Success", {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            },
            erro => {
              const msgUnsuccess: string = "Ocorreu um erro ao excluir usuário!";
              this.snackBar.open(msgUnsuccess, "Erro", {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
          )
      }
    });
  }


  openCadastro() {

    this.dialog.open(DialogCadastroComponent,
        {
          width: '50%',
          height: '70%'
        }
      )

    // this.router.navigate(['/usuarios/novo'])
  }


  preparaEdicao(id: number) {
    this.dialog.open(DialogCadastroComponent,
      {
        width: '50%',
        height: '70%',
        data: { id }
      }
    )
  }


  uploadFoto(event: any, usuario: Usuario) {
    const files = event.target.files;
    if(files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
            .upload(formData, usuario)
            .subscribe(response => this.listarContatos());
    }
  }



}
