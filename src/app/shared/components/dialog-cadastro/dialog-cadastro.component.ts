import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/usuarios/usuario';
import { UsuarioService } from 'src/app/usuarios/usuario.service';

@Component({
  selector: 'app-dialog-cadastro',
  templateUrl: './dialog-cadastro.component.html',
  styleUrls: ['./dialog-cadastro.component.css']
})
export class DialogCadastroComponent implements OnInit {

  usuario!: Usuario;
  hide = true;
  formulario!: FormGroup;
  id?: number;

  disabled: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogCadastroComponent,
    private fb: FormBuilder,
    private service: UsuarioService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
      this.montarFormulario();

      this.id = this.data.id;

      if(this.id) {
        this.service
        .getUsuarioById(this.id)
        .subscribe((usuario: Usuario) => this.populaDadosFormulario(usuario))
      }

    }


    montarFormulario() {
      this.formulario = this.fb.group({
        id: [''],
        username: ['', Validators.required],
        email: ['', [Validators.email, Validators.required] ],
        password: ['', [Validators.min, Validators.required] ]
      })

    }

    populaDadosFormulario(usuario: Usuario) {
      this.formulario.patchValue({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        password: usuario.password
      })
    }



    onSubmit() {
      const formValues = this.formulario.value;
      const json = JSON.stringify(formValues);
      console.log(json);
      // let json = JSON.parse(formValues);

      // console.log(json);


      let usuario = new Usuario();
        usuario.id = formValues.id;
        usuario.username = formValues.username;
        usuario.email = formValues.email;
        usuario.password = formValues.password;
      if(this.id) {
        this.service
          .atualizar(usuario)
          .subscribe( resposta => {
            this.service.list();
            this.snackBar.open('Usuário atualizado com sucesso!', 'Sucesso!', {
              duration: 3000
            })

            location.reload();
          })
      } else {
          const formValues = this.formulario.value;

          let usuario = new Usuario();
          usuario.username = formValues.username;
          usuario.email = formValues.email;
          usuario.password = formValues.password;

          this.service.salvar(usuario).subscribe(resposta => {
            this.service.list();
            this.snackBar.open('Usuário adicionado com sucesso!', 'Sucesso!', {
              duration: 3000
            })

            location.reload();
          })
        }
    }

}
