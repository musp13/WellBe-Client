import { createAction, props } from "@ngrx/store";
import { User } from "../../interfaces/user";

export const userLogin = createAction('[User] User Login', props<{ email: string, password: string }>());
export const userLoginSuccess = createAction('[User] Login Success', props<{user: User}>());
export const userLoginFailure = createAction('[User] Login Failure', props<{ error: string}>());

export const userLogout = createAction('[User] User Logout');
export const userLogoutSuccess = createAction('[User] Logout Success');
export const userLogoutFailure = createAction('[User] Logout Failure', (error:any)=> ({error}));

export const userReset = createAction('[User] User Reset');