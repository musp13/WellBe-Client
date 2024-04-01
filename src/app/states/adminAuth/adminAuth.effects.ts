import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminLoginService } from "../../services/adminLogin/admin-login.service";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { adminLoginFailure, adminLoginSuccess, adminLogoutFailure, adminLogoutSuccess } from "./adminAuth.actions";
import { error } from "console";
import { AdminLogoutService } from "../../services/adminLogout/admin-logout.service";
import { CheckAdminService } from "../../services/checkAdmin/check-admin.service";

@Injectable()
export class AdminLoginEffects {
    constructor( private actions$: Actions,
                 private adminLoginService: AdminLoginService,
                 private adminLogoutService: AdminLogoutService,
                 private checkAdminService: CheckAdminService,
                 private router: Router  
               ){};

    adminLogin$ = createEffect( ()=>
                        this.actions$.pipe(
                            ofType('[Admin] Admin Login'),
                            switchMap( ({userName, password})=>{
                                //console.log('inside adminLoginEffect, username: ', userName, 'password: ', password);
                                return this.adminLoginService.adminLogin({userName,password}).pipe(
                                    map(result=>{
                                        console.log(' result admin: ', result.data);
                                        this.checkAdminService.isLoggedIn$.next(true);
                                        localStorage.setItem("adminId", result.data.adminId);
                                        localStorage.setItem("admin_access_token", result.admin_token);
                                        return adminLoginSuccess({admin: result.data})
                                    }),
                                    catchError( error=> of(adminLoginFailure({error})))
                                )   
                            }
                            )
                        )
                    ); // admin login close

    adminLoginSuccess$ = createEffect( ()=>
                            this.actions$.pipe(
                                ofType(adminLoginSuccess),
                                tap( ()=>{
                                    this.checkAdminService.isLoggedIn$.next(true);
                                    console.log('login success side effect');
                                    this.router.navigate(['admin/home']);
                                })
                            ),
                            {
                                dispatch: false
                            }
    );
    
    adminLogout$ = createEffect( ()=>
        this.actions$.pipe(
            ofType('[Admin] Admin Logout'),
            switchMap( ()=>{
                return this.adminLogoutService.adminLogout().pipe(
                    map(()=>{
                        console.log('admin logout success');
                        
                        return adminLogoutSuccess(); 
                    }),
                    catchError(err=> of(adminLogoutFailure(err)))
                )
            })
        )
    );//adminLogout$ closing

    adminLogoutSuccess$ = createEffect( ()=>
      this.actions$.pipe(
        ofType(adminLogoutSuccess),
        tap(()=>{
            console.log('logout success side effect'); 
            localStorage.removeItem("adminId"); 
            localStorage.removeItem("admin_access_token");   
            this.checkAdminService.isLoggedIn$.next(false);       
            this.router.navigate(['admin/login']);
        })
      ),
      {
        dispatch: false
      }   
    );
}