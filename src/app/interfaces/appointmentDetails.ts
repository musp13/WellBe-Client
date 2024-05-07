export interface AppointmentDetails{
    appointmentId: string, 
    clientName: string,
    therapistName :  string,
    clientContactNumber: string,
    slotNumber: number,
    status: string,
    participants: number,
    appointmentNumber: number,
    date: Date,
    message: string,
    duration: number,
    notes: string
}