import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalEntryComponent } from './add-journal-entry.component';

describe('AddJournalEntryComponent', () => {
  let component: AddJournalEntryComponent;
  let fixture: ComponentFixture<AddJournalEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJournalEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
