import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GetJournalsService } from '../../../services/getJournals/get-journals.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-journals',
  templateUrl: './view-journals.component.html',
  styleUrl: './view-journals.component.css'
})
export class ViewJournalsComponent implements OnInit, OnDestroy {
  getJournalsService =inject(GetJournalsService);

  getJournalSubscription!: Subscription;
  deleteJournalSubscription!: Subscription;

  journals = [];

  ngOnInit(): void {
    this.loadJournals();
  }

  loadJournals(){
    this.getJournalSubscription = this.getJournalsService.getJournals().subscribe({
                                  next: (res)=>{
                                    this.journals = res.data.journals;
                                    console.log(this.journals);  
                                    //console.log(res.data.journals); 
                                  },
                                  error: (err)=>{
                                    console.log(err.error.message);
                                    
                                  }
    });
  }

  deleteJournal(journalId: string) {
    //alert('dele btn clicked')
    this.deleteJournalSubscription = this.getJournalsService.deleteJournal(journalId).subscribe({
      next: (res)=>{ 
        //console.log(res.data.journals); 
        this.loadJournals();
      },
      error: (err)=>{
        console.log(err.error.message);
        
      }
    });
  }

  ngOnDestroy(): void {
    if(this.getJournalSubscription)
      this.getJournalSubscription.unsubscribe();
    if(this.deleteJournalSubscription)
      this.deleteJournalSubscription.unsubscribe();
  }

}
