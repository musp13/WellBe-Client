import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../Validators/noWhitespace.validator';
import { Subscription } from 'rxjs';
import { AddJournalService } from '../../../services/addJournal/add-journal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-journal-entry',
  templateUrl: './add-journal-entry.component.html',
  styleUrl: './add-journal-entry.component.css'
})
export class AddJournalEntryComponent implements OnInit, OnDestroy {
  fb= inject(FormBuilder);
  addJournalService = inject(AddJournalService);
  toastr = inject(ToastrService);
  router = inject(Router)

  journalForm!: FormGroup;

  addJournalSubscription!: Subscription;

  ngOnInit(): void {
    this.validateForm();  
  }

  validateForm(){
    this.journalForm = this.fb.group({
      todaysFocus:  ['', Validators.compose([Validators.required, noWhitespaceValidator()])],
      /* password: ['', Validators.required] */
      excitedAbout: [''],
      affirmation: [''],
      todaysGoal: [''],
      goodThings1: [''],
      goodThings2: [''],
      goodThings3: [''],
      positiveActions1: [''],
      positiveActions2: [''],
      positiveActions3: [''],
      gratefulFor1: [''],
      gratefulFor2: [''],
      gratefulFor3: [''],
      peopleMadeFeelGood1: [''],
      peopleMadeFeelGood2: [''],
      peopleMadeFeelGood3: [''],
    });
  }

  addEntry(){
    this.addJournalSubscription = this.addJournalService.addJournal(this.journalForm.value)
                                      .subscribe({
                                        next: (res)=>{
                                          this.toastr.success(res.message);
                                          this.journalForm.reset();
                                          this.router.navigate(['/user/view_journals'])

                                        },
                                        error: (err)=>{
                                          console.log(err.error.message);
                                          this.toastr.error(err.error.message);
                                        }
                                      })
  }

  ngOnDestroy(): void {
    if(this.addJournalSubscription)
        this.addJournalSubscription.unsubscribe();
  }
}
