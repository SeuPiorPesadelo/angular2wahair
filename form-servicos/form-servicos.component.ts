import { Component, OnInit} from '@angular/core';
import { CrudServicosService } from '../../app/crud-servicos.service';
import { Servico } from '../../app/servico';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from'@angular/forms';

@Component({
  selector: 'app-form-servicos',
  templateUrl: './form-servicos.component.html',
  styleUrls: ['./form-servicos.component.css']
})
export class FormServicosComponent implements OnInit {

  titulo = "Cadastro de Servicos";
  servico: Servico = new Servico();
  codigo;
  userForm: FormGroup;
  
  constructor(private servicoService: CrudServicosService,
              private router: Router,
              private rota:ActivatedRoute,
              private formBuilder: FormBuilder) {
              this.userForm = this.formBuilder.group({
                'name': ['', Validators.required],
                'precoForm': ['', [Validators.required]]
              });
  }

  ngOnInit() {
    this.codigo = this.rota.snapshot.params['cod'];
    if(isNaN(this.codigo)){
      this.servico = new Servico();
    } else {
      this.servicoService.getServicoPorCodigo(this.codigo).subscribe(s => this.servico = s);
    }
  }

  salvarServico(){
    if (this.userForm.dirty && this.userForm.valid) {
      if(typeof this.codigo != 'undefined'){
        this.servicoService.atualizaServico(this.codigo, this.servico)
          .subscribe(() => {
              console.log("Update Success");
              this.router.navigate(['/lista']);
          });
      } else {
        this.servicoService.adicionarServico(this.servico)
          .subscribe(() => {
            console.log("Saved Success");
            this.router.navigate(['/lista']);
          });//quando o POST for bem sucedido usará o .subscribe();
      }
    } else {
      alert('Preencha os campos');
    }
  }

  cancelar(){
    this.router.navigate(['/lista']);
  }
}
