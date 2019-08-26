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
  img: Array<string>
  
}

export interface Order {
  id: string
  roomId: string
  startDate: Date
  endDate: Date
  isFinished: boolean
  isLongRent: boolean
}
