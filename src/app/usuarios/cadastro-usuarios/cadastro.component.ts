import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  // [x: string]: any;

  usuario!: Usuario;
  hide = true;
  formulario!: FormGroup;
  id!: number;

  disabled: boolean = false;


  constructor(
    private fb: FormBuilder,
    private service: UsuarioService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
      params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id) {
          this.service
            .getUsuarioById(this.id)
            .subscribe((usuario: Usuario) => this.populaDadosFormulario(usuario))
        }
      })

      this.montarFormulario();
  }


  montarFormulario() {
    this.formulario = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required] ],
      dataCadastro: ['', Validators.required],
      password: ['', [Validators.min, Validators.required] ]
    })

  }

  populaDadosFormulario(usuario: Usuario) {
    this.formulario.patchValue({
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      dataCadastro: usuario.dataCadastro,
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
      usuario.dataCadastro = formValues.dataCadastro;
      usuario.password = formValues.password;
    if(this.id) {
      this.service
        .atualizar(usuario)
        .subscribe( resposta => {
          this.service.list();
          this.snackBar.open('Usuário atualizado com sucesso!', 'Sucesso!', {
            duration: 3000
          })

          this.router.navigate(['/usuarios'])
        })
    } else {
        const formValues = this.formulario.value;

        let usuario = new Usuario();
        usuario.username = formValues.username;
        usuario.email = formValues.email;
        usuario.dataCadastro = formValues.dataCadastro;
        usuario.password = formValues.password;

        this.service.salvar(usuario).subscribe(resposta => {
          this.service.list();
          this.snackBar.open('Usuário adicionado com sucesso!', 'Sucesso!', {
            duration: 3000
          })

          this.router.navigate(['/usuarios'])
        })
      }
  }



}

