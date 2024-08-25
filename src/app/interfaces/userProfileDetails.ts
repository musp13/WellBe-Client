export interface UserProfile {
    fullName: string, 
    email: string, 
    userName: string, 
    profileImage: string, 
    phoneNo?: string,
    age?: number, 
    gender?: string, 
    location?: string, 
    bio?: string, 
    interests: string[],
    workStatus?: string,
    education?: string
}