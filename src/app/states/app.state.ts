import { AdminLoginState } from "./adminAuth/adminAuth.reducer";
import { TherapistLoginState } from "./therapistAuth/therapistAuth.reducer";
import { UserLoginState } from "./userAuth/userAuth.reducer";

export interface AppState {
    adminLogin: AdminLoginState,
    therapistLogin: TherapistLoginState,
    userLogin: UserLoginState
}