import { createReducer, on } from "@ngrx/store";
import { Therapist } from "../../interfaces/therapist";
import { therapistLogin, therapistLoginFailure, therapistLoginSuccess, therapistLogout, therapistLogoutSuccess, therapistReset } from "./therapistAuth.actions";

export interface TherapistLoginState{
    error: string | null,
    isLoading: boolean,
    therapist: Therapist|null
}

const initialState : TherapistLoginState = {
    error: null,
    isLoading: false,
    therapist: null
}

export const therapistLoginReducer = createReducer( initialState, 
                                                    on(therapistLogin, (state : TherapistLoginState)=> ({ ...state, isLoading: true })),
                                                    on(therapistLoginSuccess, (state: TherapistLoginState, {therapist})=> ({...state, therapist, isLoading: false})),
                                                    on(therapistLoginFailure, (state, {error})=> ({...state, error, isLoading: false}) ),
                                                    
                                                    on(therapistLogout, ()=>initialState),
                                                    on(therapistLogoutSuccess, ()=> initialState),

                                                    on(therapistReset , ()=>initialState)
                                              )