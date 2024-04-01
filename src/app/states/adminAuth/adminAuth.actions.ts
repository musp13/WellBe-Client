import { createAction, props } from "@ngrx/store";
import { Admin } from "../../interfaces/admin";

export const adminLogin = createAction('[Admin] Admin Login', props<{ userName: string, password: string }>());
export const adminLoginSuccess = createAction('[Admin] Login Success', props<{admin: Admin}>());
export const adminLoginFailure = createAction('[Admin] Login Failure', props<{ error: string}>());

export const adminLogout = createAction('[Admin] Admin Logout');
export const adminLogoutSuccess = createAction('[Admin] Logout Success');
export const adminLogoutFailure = createAction('[Admin] Logout Failure', (error:any)=> ({error}));