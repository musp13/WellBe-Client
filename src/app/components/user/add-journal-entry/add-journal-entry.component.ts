import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../Validators/noWhitespace.validator';
import { Subscription } from 'rxjs';
import { AddJournalService } from '../../../services/addJournal/add-journal.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from '../../../interfaces/journal';

@Component({
  selector: 'app-add-journal-entry',
  templateUrl: './add-journal-entry.component.html',
  styleUrl: './add-journal-entry.component.css'
})
export class AddJournalEntryComponent implements OnInit, OnDestroy {
  fb= inject(FormBuilder);
  addJournalService = inject(AddJournalService);
  toastr = inject(ToastrService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  journalId = '';
  page = '';
  journalData! : Journal;

  journalForm!: FormGroup;

  addJournalSubscription!: Subscription;
  getJournalSubscription!: Subscription;
  activatedRouteSubscription! : Subscription;
  editJournalSubscription!: Subscription;

  ngOnInit(): void {
    this.validateForm();
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe( value =>{
      this.journalId = value['journalId'];
      console.log(`check journalId from params = ${this.journalId}`);
    });

    if (this.journalId && this.journalId!=='add') {
      this.page = 'edit';
      this.getJournalSubscription = this.addJournalService.getMyJournal(this.journalId).subscribe({
        next: (res)=>{
          console.log(res.data);
          this.journalData = res.data;
          this.updateForm(this.journalData);  
        },
        error: (err)=>{
          console.log(err.error.message);
          //this.validateForm();  
          
        }
      });
      
    }else{
    /* if(this.journalId && this.journalId==='add') { */
      this.page = 'add';
      console.log("page is add:", this.page);
      console.log("journalId is add:", this.journalId);
      
      //this.validateForm();  
    }
    
    
  }

  validateForm(){
    this.journalForm = this.fb.group({
      /* todaysFocus:  [this.journalData?.todaysFocus? this.journalData.todaysFocus :'', Validators.compose([Validators.required, noWhitespaceValidator()])],
      // password: ['', Validators.required] 
      excitedAbout: [this.journalData?.excitedAbout? this.journalData.excitedAbout :''],
      affirmation: [this.journalData?.affirmation? this.journalData.affirmation :''],
      todaysGoal: [this.journalData?.todaysGoal? this.journalData.todaysGoal :''],
      goodThings1: [this.journalData?.goodThings1? this.journalData.goodThings1 :''],
      goodThings2: [this.journalData?.goodThings2? this.journalData.goodThings2 :''],
      goodThings3: [this.journalData?.goodThings3? this.journalData.goodThings3 :''],
      positiveActions1: [this.journalData?.positiveActions1? this.journalData.positiveActions1 :''],
      positiveActions2: [this.journalData?.positiveActions2? this.journalData.positiveActions2 :''],
      positiveActions3: [this.journalData?.positiveActions3? this.journalData.positiveActions3 :''],
      gratefulFor1: [this.journalData?.gratefulFor1? this.journalData.gratefulFor1 :''],
      gratefulFor2: [this.journalData?.gratefulFor2? this.journalData.gratefulFor2 :''],
      gratefulFor3: [this.journalData?.gratefulFor3? this.journalData.gratefulFor3 :''],
      peopleMadeFeelGood1: [this.journalData?.peopleMadeFeelGood1? this.journalData.peopleMadeFeelGood1 :''],
      peopleMadeFeelGood2: [this.journalData?.peopleMadeFeelGood2? this.journalData.peopleMadeFeelGood2 :''],
      peopleMadeFeelGood3: [this.journalData?.peopleMadeFeelGood3? this.journalData.peopleMadeFeelGood3 :''], */
      todaysFocus:  ['', Validators.compose([Validators.required, noWhitespaceValidator()])],
      // password: ['', Validators.required] 
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
    console.log('form is initialised');
    
  }

  updateForm(data: Journal) {
    this.journalForm.patchValue({
      todaysFocus: data.todaysFocus,
      excitedAbout: data.excitedAbout,
      affirmation: data.affirmation,
      todaysGoal: data.todaysGoal,
      goodThings1: data.goodThings1,
      goodThings2: data.goodThings2,
      goodThings3: data.goodThings3,
      positiveActions1: data.positiveActions1,
      positiveActions2: data.positiveActions2,
      positiveActions3: data.positiveActions3,
      gratefulFor1: data.gratefulFor1,
      gratefulFor2: data.gratefulFor2,
      gratefulFor3: data.gratefulFor3,
      peopleMadeFeelGood1: data.peopleMadeFeelGood1,
      peopleMadeFeelGood2: data.peopleMadeFeelGood2,
      peopleMadeFeelGood3: data.peopleMadeFeelGood3,
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

  editJournal() {
    this.editJournalSubscription = this.addJournalService.editJournal(this.journalId, this.journalForm.value)
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
    if(this.activatedRouteSubscription){
      this.activatedRouteSubscription.unsubscribe();
    }
    if (this.getJournalSubscription) {
      this.getJournalSubscription.unsubscribe();
    }
    if (this.editJournalSubscription) {
      this.editJournalSubscription.unsubscribe();
    }
  }
}
