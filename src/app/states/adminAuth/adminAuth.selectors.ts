import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AdminLoginState } from "./adminAuth.reducer";

const selectAdminLogin =  (state: AppState)=> state.adminLogin;

export const selectAdmin = createSelector(selectAdminLogin, (state: AdminLoginState)=> state.admin);
export const selectAdminLoginError = createSelector(selectAdminLogin, (state: AdminLoginState)=> state.error);