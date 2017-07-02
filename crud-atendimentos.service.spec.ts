import { TestBed, inject } from '@angular/core/testing';

import { CrudAtendimentosService } from './crud-atendimentos.service';

describe('CrudAtendimentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudAtendimentosService]
    });
  });

  it('should be created', inject([CrudAtendimentosService], (service: CrudAtendimentosService) => {
    expect(service).toBeTruthy();
  }));
});
