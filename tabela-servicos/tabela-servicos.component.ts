import { Component, OnInit } from '@angular/core';
import { Servico } from '../servico';
import { CrudServicosService } from '../crud-servicos.service';
import { TabelaClientesComponent } from '../tabela-clientes/tabela-clientes.component';
import { TabelaFuncionariosComponent } from '../tabela-funcionarios/tabela-funcionarios.component';

@Component({
  selector: 'app-tabela-servicos',
  templateUrl: './tabela-servicos.component.html',
  styleUrls: ['./tabela-servicos.component.css']
})
export class TabelaServicosComponent implements OnInit {

  titulo = "Tabela de Serviços";
  servicos: Servico[] = [];

  constructor(private servicoService: CrudServicosService) { 
    
  }

  ngOnInit() {
    this.servicoService.getServicos()
        .subscribe(s => {
            this.servicos = s;
        }, erro => console.log(erro));
  }

  remover(servico: Servico){
    this.servicoService.removerServico(servico)
    .subscribe(()  => {
      //Angular funciona na base do changeDetection por causa da performance
      //copia todo o array de servicos p/ a var novosServicos
      let novosServicos = this.servicos.slice(0);
      //acha o indice da servico a ser removida
      let indice = novosServicos.indexOf(servico);
      //retiro dessa nova lista
      novosServicos.splice(indice, 1);
      //atribui ao array principal de servicos os novosServicos
      //disparando assim o changeDetection :-)
      this.servicos = novosServicos;
    });
  }
}
