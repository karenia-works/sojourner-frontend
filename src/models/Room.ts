export interface Room {
  id: string
  name: string
  description: string
  houseType: 'single' | 'double' | 'quad'
  longAvailable: boolean
  shortAvailable: boolean
  longPrice?: number
  shortPrice?: number
  address: string
  img: Array<string>
  equipJudge: Array<boolean>
  noticeJudge: Array<boolean>
}

var exampleRoom: Room = {
  id: '5d666ae34862480001268212',
  name: 'Astronaut Beach House',
  address: 'Kennedy Space Center, Merritt Island, Florida',
  description: `
The Astronaut Beach House is a two-story house built in 1962 as a part of the then Neptune Beach subdivision at Cape Canaveral, Florida.

NASA purchased the development through eminent domain for $31,500 in 1963 to accommodate the expanding Kennedy Space Center, and other private homes were removed. Unlike a nearby gas station and store, the home was left and has served as a social gathering point for astronauts prior to launch. Officially it was called the Astronaut Training and Rehabilitation Building then, today it is officially titled the Kennedy Space Center Conference Center. Throughout its history with NASA it has been known as the Astronaut Beach House or simply The Beach House.

It stands 50 metres back from the shoreline directly in between Pads 40 and 41 It also serves as a private conference center, and for astronauts and their families for private gatherings and barbecues before launch. The house contains memorabilia including wine bottles signed by crew members identified by mission decals. `,
  equipJudge: [true, true, true, true, true, true, true, true],
  houseType: 'quad',
  longAvailable: true,
  shortAvailable: true,
  longPrice: 9999,
  shortPrice: 399,
  noticeJudge: [true, true, true, true, true, true, true, true],
  img: [
    'https://www.nasa.gov/sites/default/files/thumbnails/image/3-2014-1588a.jpg',
    'https://www.nasa.gov/sites/default/files/thumbnails/image/5-beach_house_1974a.jpg'
  ]
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
  id: string
  userName: string // nickname
  email: string
  phoneNumber: string
  sex: 'M' | 'F' | 'U'
  avatar: string
  signupDate: Date
}

export interface Issue {
  id: string
  uid: string
  hid: string
  wid: string
  img: string[]
  complaint: string
  needRepair: boolean
  isReplied: boolean
  isFinished: boolean
  createTime: Date
}

export { exampleRoom }
