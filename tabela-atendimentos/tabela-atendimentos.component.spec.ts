import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAtendimentosComponent } from './tabela-atendimentos.component';

describe('TabelaAtendimentosComponent', () => {
  let component: TabelaAtendimentosComponent;
  let fixture: ComponentFixture<TabelaAtendimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaAtendimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
