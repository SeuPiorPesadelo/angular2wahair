import { Component, OnInit } from '@angular/core';
import { CrudFuncionariosService } from '../../app/crud-funcionarios.service';
import { CrudServicosService } from '../../app/crud-servicos.service';
import { Funcionario } from '../../app/funcionario';
import { Servico } from '../../app/servico';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-funcionarios',
  templateUrl: './form-funcionarios.component.html',
  styleUrls: ['./form-funcionarios.component.css']
})
export class FormFuncionariosComponent implements OnInit {

  titulo = "Cadastro de Funcionarios";
  funcionario: Funcionario;
  servicos: Servico[];
  codigo;

  constructor(private funcionarioService: CrudFuncionariosService,
              private servicoService: CrudServicosService,
              private router: Router,
              private rota:ActivatedRoute) {
  }

  ngOnInit() {
    this.codigo = this.rota.snapshot.params['cod'];
    if(isNaN(this.codigo)){
      this.funcionario = new Funcionario();
      this.funcionario.servicos = [];
      this.servicoService.getServicos().subscribe(s => this.servicos = s);
    } else {
      this.funcionarioService.getFuncionarioPorCodigo(this.codigo).subscribe(s => {
        this.funcionario = s;
      });
      this.servicoService.getServicos().subscribe(s => this.servicos = s);
    }
  }

  salvarFuncionario(){
    if(typeof this.codigo != 'undefined'){
      this.funcionarioService.atualizaFuncionario(this.codigo, this.funcionario)
        .subscribe(() => {
            this.cancelar();
        });
    } else {
      this.funcionarioService.adicionarFuncionario(this.funcionario)
        .subscribe(() => {
          this.cancelar();
        });
    }
  }

  cancelar(){
    this.router.navigate(['/lista']);
  }

  updateCheckedOptions(serv, event) {
    var cbIdx = this.arrayObjectIndexOf(this.funcionario.servicos, serv);
    if(event.target.checked) {
        if(cbIdx < 0 )
          this.funcionario.servicos.push(serv);
    } else {
        if(cbIdx >= 0 )
          this.funcionario.servicos.splice(cbIdx,1);
    }
  }

  isChecked(serv){
    var i;
    for (i = 0; i < this.funcionario.servicos.length; i++) {
        if (this.funcionario.servicos[i].id == serv.id) {
            return true;
        }
    }
  }
  
  arrayObjectIndexOf(arr, obj){
    for(var i = 0; i < arr.length; i++){
        if( JSON.stringify(arr[i]) == JSON.stringify(obj)){
            return i;
        }
    };
    return -1;
  }

}
