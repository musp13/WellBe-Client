export interface Appointment {
    _id?: string;
    therapistId: string; // Reference to a Therapist document
    clientId: string; // Reference to a User document
    clientContactNumber?: string;
    date: Date;
    time?: string;
    slotNumber : number;
    duration?: number; // Default is 60 minutes
    message?: string;
    status?: 'scheduled' | 'cancelled' | 'completed'; // Default is 'scheduled'
    notes?: string;
    participants?: number; // Default is 1
    appointmetNumber?: number;
    createdAt?: Date; 
    updatedAt?: Date; 

}