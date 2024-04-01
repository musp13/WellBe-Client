import { createReducer, on } from "@ngrx/store";
import { Admin } from "../../interfaces/admin";
import { adminLogin, adminLoginFailure, adminLoginSuccess, adminLogout, adminLogoutSuccess } from "./adminAuth.actions";

export interface AdminLoginState{
    error: string | null,
    isLoading: boolean,
    admin: Admin|null
}

const initialState : AdminLoginState = {
    error: null,
    isLoading: false,
    admin: null
}

export const adminLoginReducer = createReducer( initialState, 
                                                    on(adminLogin, (state : AdminLoginState)=> ({ ...state, isLoading: true })),
                                                    on(adminLoginSuccess, (state: AdminLoginState, {admin})=> ({...state, admin, isLoading: false})),
                                                    on(adminLoginFailure, (state, {error})=> ({...state, error, isLoading: false}) ),
                                                    
                                                    on(adminLogout, ()=>initialState),
                                                    on(adminLogoutSuccess, ()=> initialState)
                                              )