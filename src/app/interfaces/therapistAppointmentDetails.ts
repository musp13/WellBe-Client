export interface TherapistAppointmentDetails {
    appointmentId: string,
    clientName : string ,
    clientContactNumber: string,
    slotNumber: number ,
    status: string,
    participants: number,
    appointmentNumber: number,
    date: Date,
    message: string
}