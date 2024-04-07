import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { UserLoginService } from "../../services/userLogin/user-login.service";
import { UserLogoutService } from "../../services/userLogout/user-logout.service";
import { CheckUserService } from "../../services/checkUser/check-user.service";
import { userLoginFailure, userLoginSuccess, userLogoutFailure, userLogoutSuccess } from "./userAuth.actions";
import { EncryptionService } from "../../services/encryption/encryption.service";

@Injectable()
export class UserLoginEffects {
    constructor( private actions$: Actions,
                 private userLoginService: UserLoginService,
                 private userLogoutService: UserLogoutService,
                 private checkUserService: CheckUserService,
                 private router: Router,
                 private encryptionService: EncryptionService  
               ){};

    userLogin$ = createEffect( ()=>
                        this.actions$.pipe(
                            ofType('[User] User Login'),
                            switchMap( ({email, password})=>{
                                return this.userLoginService.usertLogin({email,password}).pipe(
                                    map(result=>{
                                        console.log(' result user: ', result.data);
                                        this.checkUserService.isLoggedIn$.next(true);
                                        const encryptedUserId = this.encryptionService.encrypt(result.data.userId);
                                        localStorage.setItem("userId", encryptedUserId);
                                        localStorage.setItem("user_access_token", result.user_token);
                                        return userLoginSuccess({user: result.data})
                                    }),
                                    catchError( error=>{
                                        // Extracting error message from the HTTP response
                                        let errorMessage = 'An unknown error occurred!';
                                        if (error.error && error.error.message) {
                                            errorMessage = error.error.message;
                                        }
                                        return of(userLoginFailure({error: errorMessage}))
                                    })
                                )   
                            }
                            )
                        )
                    ); // user login close

    userLoginSuccess$ = createEffect( ()=>
                            this.actions$.pipe(
                                ofType(userLoginSuccess),
                                tap( ()=>{
                                    this.checkUserService.isLoggedIn$.next(true);
                                    console.log('login success side effect');
                                    this.router.navigate(['user/home']);
                                })
                            ),
                            {
                                dispatch: false
                            }
    );
    
    userLogout$ = createEffect( ()=>
        this.actions$.pipe(
            ofType('[User] User Logout'),
            switchMap( ()=>{
                return this.userLogoutService.userLogout().pipe(
                    map(()=>{
                        console.log('user logout success');
                        
                        return userLogoutSuccess(); 
                    }),
                    catchError(err=> {
                        // Extracting error message from the HTTP response
                        let errorMessage = 'An unknown error occurred!';
                        if (err.error && err.error.message) {
                            errorMessage = err.error.message;
                        }
                        return of(userLogoutFailure({err: errorMessage}))
                    })
                )
            })
        )
    );//adminLogout$ closing

    userLogoutSuccess$ = createEffect( ()=>
      this.actions$.pipe(
        ofType(userLogoutSuccess),
        tap(()=>{
            console.log('logout success side effect'); 
            localStorage.removeItem("userId"); 
            localStorage.removeItem("user_access_token");   
            this.checkUserService.isLoggedIn$.next(false);       
            this.router.navigate(['user/login']);
        })
      ),
      {
        dispatch: false
      }   
    );
}