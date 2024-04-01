import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserLoginState } from "./userAuth.reducer";

const selectUserLogin =  (state: AppState)=> state.userLogin;

export const selectUser = createSelector(selectUserLogin, (state: UserLoginState)=> state.user);
export const selectUserLoginError = createSelector(selectUserLogin, (state: UserLoginState)=> state.error);