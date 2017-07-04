import { Component, OnInit } from '@angular/core';
import { CrudClientesService } from '../../app/crud-clientes.service';
import { Cliente } from '../../app/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from'@angular/forms';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {

  titulo = "Cadastro de Clientes";
  cliente: Cliente;
  codigo;
  userForm: FormGroup;

  constructor(private clienteService: CrudClientesService,
              private router: Router,
              private rota:ActivatedRoute,
              private formBuilder: FormBuilder) {
              this.userForm = formBuilder.group({
                'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
                'precoForm': ['', [Validators.required]]
              });
  }

  ngOnInit() {
    this.codigo = this.rota.snapshot.params['cod'];
    console.log(this.codigo);
    if(isNaN(this.codigo)){
      this.cliente = new Cliente();
    } else {
      this.clienteService.getClientePorCodigo(this.codigo).subscribe(s => this.cliente = s);
    }
  }

  salvarCliente(){
    if(typeof this.codigo != 'undefined'){
      this.clienteService.atualizaCliente(this.codigo, this.cliente)
        .subscribe(() => {
            this.cancelar();
        });
    } else {
      this.clienteService.adicionarCliente(this.cliente)
        .subscribe(() => {
          this.cancelar();
        });
    }
  }

  cancelar(){
    this.router.navigate(['/lista']);
  }
}