import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtendimentosComponent } from './form-atendimentos.component';

describe('FormAtendimentosComponent', () => {
  let component: FormAtendimentosComponent;
  let fixture: ComponentFixture<FormAtendimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAtendimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
