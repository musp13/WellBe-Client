export interface AppointmentFormDetails {
    fullName : string,
    email : string,
    phoneNo ?: string,
    therapistList : {_id: string, fullName :string}[]
}