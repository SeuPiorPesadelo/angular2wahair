import { Component, OnInit } from '@angular/core';
import { Atendimento } from '../atendimento';
import { CrudAtendimentosService } from '../crud-atendimentos.service';

@Component({
  selector: 'app-tabela-atendimentos',
  templateUrl: './tabela-atendimentos.component.html',
  styleUrls: ['./tabela-atendimentos.component.css']
})
export class TabelaAtendimentosComponent implements OnInit {
  
  titulo = "Tabela de Atendimentos";
  atendimentos: Atendimento[] = [];

  constructor(private atendimentoService: CrudAtendimentosService) { 
  }

  ngOnInit() {
    this.atendimentoService.getAtendimentos()
      .subscribe(a => {
          this.atendimentos = a;
      }, erro => console.log(erro));
  }

  remover(a: Atendimento){
    this.atendimentoService.removerAtendimento(a)
    .subscribe(()  => {
      let novosAtendimentos = this.atendimentos.slice(0);
      let indice = novosAtendimentos.indexOf(a);
      novosAtendimentos.splice(indice, 1);
      this.atendimentos = novosAtendimentos;
    });
  }
}
