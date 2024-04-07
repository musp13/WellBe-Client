export interface User {
    userId: string
    fullName?: string
    profileImage?: string
    userName: string
    email: string
    isVerified?: boolean
    isBlocked?: boolean
    isDeleted?: boolean
}
  