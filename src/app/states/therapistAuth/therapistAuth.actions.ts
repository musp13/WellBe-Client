import { createAction, props } from "@ngrx/store";
import { Therapist } from "../../interfaces/therapist";

export const therapistLogin = createAction('[Therapist] Therapist Login', props<{ email: string, password: string }>());
export const therapistLoginSuccess = createAction('[Therapist] Login Success', props<{therapist: Therapist}>());
export const therapistLoginFailure = createAction('[Therapist] Login Failure', props<{ error: string}>());

export const therapistLogout = createAction('[Therapist] Therapist Logout');
export const therapistLogoutSuccess = createAction('[Therapist] Logout Success');
export const therapistLogoutFailure = createAction('[Therapist] Logout Failure', (error)=> ({error}));

export const therapistReset = createAction('[Therapist] Therapist Reset');