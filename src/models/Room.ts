export interface Room {
  id: string
  name: string
  description: string
  type: 'single' | 'double' | 'quad'
  longAvailable: boolean
  shortAvailable: boolean
  longPrice?: number
  shortPrice?: number
  address: {
    city: string
    district: string
  }
  img: Array<string>
}

export interface Order {
  id: string
  roomId: string
  startDate: Date
  endDate: Date
  ddlDate: Date
  isFinished: boolean
  isLongRent: boolean
  totalPrice: number
  room: Room
}

export interface Profile {
  userId: string
  userName: string    // nickname
  email: string
  phoneNumber: string
  sex: 'M' | 'F' | 'U'
  avatar: string
  signupDate: Date
}