import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario';
import { CrudFuncionariosService } from '../crud-funcionarios.service';

@Component({
  selector: 'app-tabela-funcionarios',
  templateUrl: './tabela-funcionarios.component.html',
  styleUrls: ['./tabela-funcionarios.component.css']
})
export class TabelaFuncionariosComponent implements OnInit {

  titulo = "Tabela de Funcionario";
  funcionarios: Funcionario[] = [];

  constructor(private funcionarioService: CrudFuncionariosService) { }

  ngOnInit() {
    this.funcionarioService.getFuncionarios()
        .subscribe(s => {
            this.funcionarios = s;
        }, erro => console.log(erro));
  }

  remover(funcionario: Funcionario){
    this.funcionarioService.removerFuncionario(funcionario)
    .subscribe(()  => {
      let novosFuncionarios = this.funcionarios.slice(0);
      let indice = novosFuncionarios.indexOf(funcionario);
      novosFuncionarios.splice(indice, 1);
      this.funcionarios = novosFuncionarios;
    });
  }
}
