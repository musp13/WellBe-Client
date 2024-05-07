export interface Availability {
    day: string,
    slotNumbers?: number[],
    shift : string,
    startTime?: string,
    endTime?: string,
    isUnavailable?: boolean,
    reasonForUnavailable?: string
}