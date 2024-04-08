import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
//import { adminLoginFailure, adminLoginSuccess, adminLogoutFailure, adminLogoutSuccess } from "./adminAuth.actions";
import { TherapistLoginService } from "../../services/therapistLogin/therapist-login.service";
import { TherapistLogoutService } from "../../services/therapistLogout/therapist-logout.service";
import { CheckTherapistService } from "../../services/checkTherapist/check-therapist.service";
import { therapistLoginFailure, therapistLoginSuccess, therapistLogoutFailure, therapistLogoutSuccess } from "./therapistAuth.actions";
import { EncryptionService } from "../../services/encryption/encryption.service";

@Injectable()
export class TherapistLoginEffects {
    constructor( private actions$: Actions,
                 private therapistLoginService: TherapistLoginService,
                 private therapistLogoutService: TherapistLogoutService,
                 private checkTherapistService: CheckTherapistService,
                 private router: Router,
                 private encryptionService: EncryptionService  
               ){};

    therapistLogin$ = createEffect( ()=>
                        this.actions$.pipe(
                            ofType('[Therapist] Therapist Login'),
                            switchMap( ({email, password})=>{
                                return this.therapistLoginService.therapistLogin({email,password}).pipe(
                                    map(result=>{
                                        console.log(' result therapist: ', result.data);
                                        this.checkTherapistService.isLoggedIn$.next(true);
                                        const encryptedTherapistId = this.encryptionService.encrypt(result.data.therapistId);
                                        localStorage.setItem("therapistId", encryptedTherapistId);
                                        if(result.therapist_token)
                                            localStorage.setItem("therapist_access_token", result.therapist_token?result.therapist_token:'');
                                        return therapistLoginSuccess({therapist: result.data})
                                    }),
                                    catchError( error=>{
                                        // Extracting error message from the HTTP response
                                        let errorMessage = 'An unknown error occurred!';
                                        if (error.error && error.error.message) {
                                            errorMessage = error.error.message;
                                        }
                                        return of(therapistLoginFailure({error: errorMessage}))
                                    })
                                )   
                            }
                            )
                        )
                    ); // therapist login close

    therapistLoginSuccess$ = createEffect( ()=>
                            this.actions$.pipe(
                                ofType(therapistLoginSuccess),
                                tap( ()=>{
                                    this.checkTherapistService.isLoggedIn$.next(true);
                                    console.log('login success side effect');
                                    this.router.navigate(['therapist/home']);
                                })
                            ),
                            {
                                dispatch: false
                            }
    );


    
    therapistLogout$ = createEffect( ()=>
        this.actions$.pipe(
            ofType('[Therapist] Therapist Logout'),
            switchMap( ()=>{
                return this.therapistLogoutService.therapistLogout().pipe(
                    map(()=>{
                        console.log('therapist logout success');
                        
                        return therapistLogoutSuccess(); 
                    }),
                    catchError(err=> {
                        // Extracting error message from the HTTP response
                        let errorMessage = 'An unknown error occurred!';
                        if (err.error && err.error.message) {
                            errorMessage = err.error.message;
                        }
                        return of(therapistLogoutFailure({err: errorMessage}))
                    })
                )
            })
        )
    );//adminLogout$ closing

    therapistLogoutSuccess$ = createEffect( ()=>
      this.actions$.pipe(
        ofType(therapistLogoutSuccess),
        tap(()=>{
            console.log('logout success side effect'); 
            localStorage.removeItem("therapistId");    
            localStorage.removeItem("therapist_access_token");
            this.checkTherapistService.isLoggedIn$.next(false);       
            this.router.navigate(['therapist/login']);
        })
      ),
      {
        dispatch: false
      }   
    );
}