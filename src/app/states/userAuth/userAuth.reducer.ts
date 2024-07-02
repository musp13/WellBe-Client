import { createReducer, on } from "@ngrx/store";
import { User } from "../../interfaces/user";
import { userLogin, userLoginFailure, userLoginSuccess, userLogout, userLogoutSuccess, userReset } from "./userAuth.actions";


export interface UserLoginState{
    error: string | null,
    isLoading: boolean,
    user: User|null
}

const initialState : UserLoginState = {
    error: null,
    isLoading: false,
    user: null
}

export const userLoginReducer = createReducer( initialState, 
                                                    on(userLogin, (state : UserLoginState)=> ({ ...state, isLoading: true })),
                                                    on(userLoginSuccess, (state: UserLoginState, {user})=> ({...state, user,
                                                         isLoading: false})),
                                                    on(userLoginFailure, (state, {error})=> ({...state, error,
                                                         isLoading: false}) ),
                                                    
                                                    on(userLogout, ()=>initialState),
                                                    on(userLogoutSuccess, ()=> initialState),

                                                    on(userReset, ()=>initialState)
                                              )