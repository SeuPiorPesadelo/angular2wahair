import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaFuncionariosComponent } from './tabela-funcionarios.component';

describe('TabelaFuncionariosComponent', () => {
  let component: TabelaFuncionariosComponent;
  let fixture: ComponentFixture<TabelaFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
