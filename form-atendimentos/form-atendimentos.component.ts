import { Component, OnInit } from '@angular/core';
import { CrudAtendimentosService } from '../crud-atendimentos.service';
import { Atendimento } from '../atendimento';
import { Cliente } from '../cliente';
import { CrudClientesService } from '../crud-clientes.service';
import { Funcionario } from '../funcionario';
import { CrudFuncionariosService } from '../crud-funcionarios.service';
import { Servico } from '../servico';
import { CrudServicosService } from '../crud-servicos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-atendimentos',
  templateUrl: './form-atendimentos.component.html',
  styleUrls: ['./form-atendimentos.component.css']
})
export class FormAtendimentosComponent implements OnInit {

  titulo = "Cadastro de Atendimentos";
  atendimento: Atendimento;
  cliente: Cliente;
  clientes: Cliente[];
  funcionarios: Funcionario[];
  servicos: Servico[];
  pago: boolean;
  total: number;
  codigo;

  constructor(private atendimentoService: CrudAtendimentosService,
              private clienteService: CrudClientesService,
              private funcionarioService: CrudFuncionariosService,
              private servicoService: CrudServicosService,
              private router: Router,
              private rota:ActivatedRoute) { 
  }

  ngOnInit() {
    this.codigo = this.rota.snapshot.params['cod'];
    if(isNaN(this.codigo)){
      this.atendimento = new Atendimento();
      this.atendimento.funcionarios = [];
      this.atendimento.servicos = [];
      this.atendimento.cliente = new Cliente();
      this.clienteService.getClientes().subscribe(c => this.clientes = c);
      this.funcionarioService.getFuncionarios().subscribe(f => {
        this.funcionarios = f;
        this.servicos = [];
      });
      this.total = 0;
    } else {
      this.atendimentoService.getAtendimentoPorCodigo(this.codigo).subscribe(s => {
        this.atendimento = s;
        this.clienteService.getClientes().subscribe(c => this.clientes = c);
        this.funcionarioService.getFuncionarios().subscribe(f => {
          this.funcionarios = f;
          this.servicos = [];
        });
        let t = 0;
        this.atendimento.servicos.forEach(s => {t += s.preco;console.log(s.preco)});
        this.total = t;
      });
    }
  }

  getTodosServicosFuncionario(arr){
    let s = new Array<Servico>();
    var i;
    for (i = 0; i < arr.length; i++) {
      for (var z = 0; z < arr[i].servicos.length; z++){
        s.push(arr[i].servicos[z]);
      }
    }
    return s;
  }

  salvarAtendimento(){
    if(typeof this.codigo != 'undefined'){
      this.atendimentoService.atualizaAtendimento(this.codigo, this.atendimento)
        .subscribe(() => {
            this.cancelar();
        });
    } else {
      if(this.atendimento.cliente.nome != null && this.atendimento.funcionarios.length > 0 && this.atendimento.servicos.length > 0){
        this.atendimentoService.adicionarAtendimento(this.atendimento)
          .subscribe(() => {
            this.cancelar();
          });
      } else {
        console.log('Preencher todos os campos');
      }
    }
  }

  cancelar(){
    this.router.navigate(['/lista']);
  }

  updateCheckedCliente(novoCliente, event) {
    if(event.target.checked) {
      this.atendimento.cliente = novoCliente;
    }
  }
  
  isClienteChecked(c){
    if( JSON.stringify(this.atendimento.cliente) == JSON.stringify(c)){
      return true;
    }
  }
  
  isFuncionarioChecked(f){
    var i;
    for (i = 0; i < this.atendimento.funcionarios.length; i++) {
        if (this.atendimento.funcionarios[i].id == f.id) {
            return true;
        }
    }
  }
  
  updateCheckedFuncionario(novoFunc, event) {
    var cbIdx = this.arrayObjectIndexOf(this.atendimento.funcionarios, novoFunc);
    if(event.target.checked) {
        if(cbIdx < 0 )
          this.atendimento.funcionarios.push(novoFunc);
          for (var i = 0; i < novoFunc.servicos.length; i++) {
            this.servicos.push(novoFunc.servicos[i]);
          }
    } else {
        if(cbIdx >= 0 ){
          this.atendimento.funcionarios.splice(cbIdx,1);
          for (var i = 0; i < this.servicos.length; i++) {
            for (var z = 0; z < novoFunc.servicos.length; z++) {
              if(this.servicos[i].id == novoFunc.servicos[z].id){
                this.servicos.splice(i,1);
              }
            }
          }
        }
    }
  }

  isServicoChecked(servicoDosFuncionarios){
    var i;
    for (i = 0; i < this.atendimento.servicos.length; i++) {
      if (this.atendimento.servicos[i].id == servicoDosFuncionarios.id) {
          return true;
      }
    }
  }
  
  updateCheckedServico(servicoDoFuncionario, event) {
    var cbIdx = this.arrayObjectIndexOf(this.atendimento.servicos, servicoDoFuncionario);
    if(event.target.checked) {
      if(cbIdx < 0)
        this.atendimento.servicos.push(servicoDoFuncionario);
        this.total += servicoDoFuncionario.preco;
    } else {
      if(cbIdx >= 0)
        this.atendimento.servicos.splice(cbIdx,1);
        this.total -= servicoDoFuncionario.preco;
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

  objArray = [{name: "Não Pago"},{name: "Pago"}];
  onChange(v){
      if(v == 'Pago'){
        this.atendimento.pago = true;
      } else {
        this.atendimento.pago = false;
      }
  }

}
