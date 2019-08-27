export interface Room {
  id: string
  name: string
  description: string
  type: 'single' | 'dual' | 'quad'
  longAvailable: boolean
  shortAvailable: boolean
  longPrice?: number
  shortPrice?: number
  address: string
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
}
