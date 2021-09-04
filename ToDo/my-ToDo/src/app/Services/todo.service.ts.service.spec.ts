import { TestBed } from '@angular/core/testing';

import { Todo.Service.TsService } from './todo.service';

describe('Todo.Service.TsService', () => {
  let service: Todo.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Todo.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
