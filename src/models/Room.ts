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
  equipJudge: Array<boolean>  // 8 items
  noticeJudge: Array<boolean> // 5 items
}

export interface Order {
  id: string
  houseId: string
  userId: string
  startDate: Date
  endDate: Date
  ddlDate?: Date
  isLongRent: boolean
  isFinished: boolean
  totalPrice: number
  createDate: Date
  cancelDate?: Date
  isPaid: boolean
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