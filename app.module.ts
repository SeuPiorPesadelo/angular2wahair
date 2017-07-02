import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CrudServicosService } from './crud-servicos.service';
import { CrudClientesService } from './crud-clientes.service';
import { CrudFuncionariosService } from './crud-funcionarios.service';
import { CrudAtendimentosService } from './crud-atendimentos.service';
import { TabelaServicosComponent } from './tabela-servicos/tabela-servicos.component';
import { FormServicosComponent } from './form-servicos/form-servicos.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { FormFuncionariosComponent } from './form-funcionarios/form-funcionarios.component';
import { FormAtendimentosComponent } from './form-atendimentos/form-atendimentos.component';
import { FormProdutosComponent } from './form-Produtos/form-produtos.component';
import { RouterModule, Routes } from '@angular/router';
import { TabelaClientesComponent } from './tabela-clientes/tabela-clientes.component';
import { TabelaFuncionariosComponent } from './tabela-funcionarios/tabela-funcionarios.component';
import { TabelaAtendimentosComponent } from './tabela-atendimentos/tabela-atendimentos.component';

const routes: Routes = [
  {path: '', redirectTo: 'lista', pathMatch: 'full'},

  {path: 'lista', component: TabelaServicosComponent},
  {path: 'novo', component: FormServicosComponent},
  {path: 'edicao/:cod', component: FormServicosComponent},

  {path: 'novoCliente', component: FormClientesComponent},
  {path: 'edicaoCliente/:cod', component: FormClientesComponent},

  {path: 'novoFuncionario', component: FormFuncionariosComponent},
  {path: 'edicaoFuncionario/:cod', component: FormFuncionariosComponent},

  {path: 'novoAtendimento', component: FormAtendimentosComponent},
  {path: 'edicaoAtendimento/:cod', component: FormAtendimentosComponent},

  {path: 'novoProduto', component: FormProdutosComponent},
  
  {path: '**', component: TabelaServicosComponent}//qualquer coisa invalida, vai p/ lista
];

@NgModule({
  declarations: [
    AppComponent,
    TabelaServicosComponent,
    FormServicosComponent,
    FormClientesComponent,
    FormFuncionariosComponent,
    FormProdutosComponent,
    TabelaClientesComponent,
    TabelaFuncionariosComponent,
    TabelaAtendimentosComponent,
    FormAtendimentosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CrudServicosService,CrudClientesService, CrudFuncionariosService, CrudAtendimentosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
