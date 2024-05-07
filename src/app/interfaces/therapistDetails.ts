interface Experience {
    title: string;
    company: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    current?: boolean;
    description?: string;
}

export interface TherapistDetails {
    fullName: string,
    userName: string,
    email: string,
    profileImage: string,
    phoneNo?: string,
    age?: number,
    gender?: 'male' | 'female' | 'other',
    location?: string,
    bio?: string,
    qualifications:{
        degree: string,
        institution: string,
        yearOfPassing: number
    }[],
    licenseNumber?: string,
    specializations: string[],
    experiences?: Experience[],
    languagesSpoken: string[],
    consultationFee?: number,
    ratesPerExtraPerson?: number,
    availability: {
        day: "Monday"| "Tuesday"| "Wednesday"| "Thursday"| "Friday"| "Saturday"| "Sunday";
        startTime: string,
        endTime: string
    }[],
    leave?: {
        day: Date,
        startTime: string,
        endTime: string,
        reason: string
    }[],
    isApproved: boolean,
    createdAt: Date,
    updatedAt: Date
}

