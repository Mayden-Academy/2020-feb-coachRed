export interface BookingInterface  {

  _id: string,
  date: string,
  startTime: string,
  endTime: string,
  repeat: string,
  hourlyRate: number,
  email: string,
  booked: boolean,
  bookedBy: string,
  contact: string

}