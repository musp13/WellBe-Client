import { Availability } from "./availability";
import { LeaveData } from "./leaveData";

export interface AvailabilityDetails {
    availability : Availability[],
    leave: LeaveData[]
}