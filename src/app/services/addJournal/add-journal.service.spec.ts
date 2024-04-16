import { TestBed } from '@angular/core/testing';

import { AddJournalService } from './add-journal.service';

describe('AddJournalService', () => {
  let service: AddJournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddJournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
