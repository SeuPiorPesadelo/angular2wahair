import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { CrudClientesService } from '../crud-clientes.service';

@Component({
  selector: 'app-tabela-clientes',
  templateUrl: './tabela-clientes.component.html',
  styleUrls: ['./tabela-clientes.component.css']
})
export class TabelaClientesComponent implements OnInit {

  titulo = "Tabela de Clientes";
  clientes: Cliente[] = [];

  constructor(private clienteService: CrudClientesService) { 
  }

  ngOnInit() {
    this.clienteService.getClientes()
        .subscribe(s => {
            this.clientes = s;
        }, erro => console.log(erro));
  }

  remover(c: Cliente){
    this.clienteService.removerCliente(c)
    .subscribe(()  => {
      let novosClientes = this.clientes.slice(0);
      let indice = novosClientes.indexOf(c);
      novosClientes.splice(indice, 1);
      this.clientes = novosClientes;
    });
  }
}
