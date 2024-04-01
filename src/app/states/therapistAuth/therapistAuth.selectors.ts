import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TherapistLoginState } from "./therapistAuth.reducer";

const selectTherapistLogin =  (state: AppState)=> state.therapistLogin;

export const selectTherapist = createSelector(selectTherapistLogin, (state: TherapistLoginState)=> state.therapist);
export const selectTherapistLoginError = createSelector(selectTherapistLogin, (state: TherapistLoginState)=> state.error);