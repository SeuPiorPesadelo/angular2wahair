import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaServicosComponent } from './tabela-servicos.component';

describe('TabelaServicosComponent', () => {
  let component: TabelaServicosComponent;
  let fixture: ComponentFixture<TabelaServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
