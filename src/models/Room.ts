import { Moment } from 'moment'

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
    country: string
    city: string
    street: string
  }
  img: Array<string>
  equipJudge: Array<boolean> // 8 items
  noticeJudge: Array<boolean> // 5 items
}

var exampleRoom: Room = {
  id: '5d666ae34862480001268212',
  name: 'Astronaut Beach House',
  address: {
    country: 'US',
    city: 'Florida',
    street: 'Kennedy Space Center, Merritt Island'
  },
  description: `
The Astronaut Beach House is a two-story house built in 1962 as a part of the then Neptune Beach subdivision at Cape Canaveral, Florida.

NASA purchased the development through eminent domain for $31,500 in 1963 to accommodate the expanding Kennedy Space Center, and other private homes were removed. Unlike a nearby gas station and store, the home was left and has served as a social gathering point for astronauts prior to launch. Officially it was called the Astronaut Training and Rehabilitation Building then, today it is officially titled the Kennedy Space Center Conference Center. Throughout its history with NASA it has been known as the Astronaut Beach House or simply The Beach House.

It stands 50 metres back from the shoreline directly in between Pads 40 and 41 It also serves as a private conference center, and for astronauts and their families for private gatherings and barbecues before launch. The house contains memorabilia including wine bottles signed by crew members identified by mission decals. `,
  equipJudge: [true, true, true, true, true, true, true, true],
  type: 'quad',
  longAvailable: true,
  shortAvailable: true,
  longPrice: 9999,
  shortPrice: 399,
  noticeJudge: [true, true, true, true, true],
  img: [
    'https://www.nasa.gov/sites/default/files/thumbnails/image/3-2014-1588a.jpg',
    'https://www.nasa.gov/sites/default/files/thumbnails/image/5-beach_house_1974a.jpg'
  ]
}

export interface Order {
  id: string
  houseId: string
  userEmail: string
  startDate: Date
  endDate: Date
  ddlDate?: Date
  isLongRent: boolean
  isFinished: boolean
  totalPrice: number
  createDate: Date
  cancelDate?: Date
  isPaid: boolean
  house?: Room
}
export class PendingOrder {
  constructor(
    public houseId: string,
    public userEmail: string,
    public startDate: Moment,
    public endDate: Moment,
    public isLongRent: boolean,
    public totalPrice: number,
    public createDate: Date
  ) {}

  public toOrder(): Order {
    return {
      houseId: this.houseId,
      userEmail: this.userEmail,
      startDate: this.startDate.toDate(),
      endDate: this.endDate.toDate(),
      isLongRent: this.isLongRent,
      createDate: this.createDate,
      totalPrice: this.totalPrice,
      isFinished: false,
      id: '',
      isPaid: false
    }
  }
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

var exampleProfile: Profile = {
  id: 'qwertyqwertyqwertyqwerty',
  userName: 'yingyingying', // nickname
  email: 'ying@126.com',
  phoneNumber: '13636036036',
  sex: 'M',
  avatar:
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1440019312,3309809430&fm=26&gp=0.jpg',
  signupDate: new Date()
}

export interface Issue {
  id: string
  uemail: string
  hid: string
  wemail: string
  img: string[]
  complaint: string
  reply?: string
  needRepair: boolean
  isReplied: boolean
  isFinished: boolean
  createTime: Date
}

const exampleIssue: Issue = {
  id: '5d69eea236b9fd0001352c90',
  uemail: 'ying@ying.com',
  wemail: '',
  hid: '5d690b880b3026000197f26b',
  img: [
    'https://sojourner.rynco.me/api/v1/image/5d69eea236b9fd0001352c8e',
    'https://sojourner.rynco.me/api/v1/image/5d69eea236b9fd0001352c8c'
  ],
  complaint: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed augue lacus. Magna ac placerat vestibulum lectus mauris ultrices eros. Ultricies mi eget mauris pharetra et. Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Pulvinar etiam non quam lacus suspendisse faucibus. Elementum tempus egestas sed sed risus pretium. Nulla at volutpat diam ut venenatis tellus in. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Massa massa ultricies mi quis hendrerit dolor magna eget est. Diam maecenas sed enim ut sem viverra aliquet. Sit amet mauris commodo quis imperdiet massa. Massa massa ultricies mi quis hendrerit dolor magna. Proin nibh nisl condimentum id venenatis a condimentum. Ipsum consequat nisl vel pretium lectus quam id leo. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Eu augue ut lectus arcu bibendum.

Morbi tristique senectus et netus et malesuada fames. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Ultrices in iaculis nunc sed. Nisi porta lorem mollis aliquam ut porttitor leo a. Quisque non tellus orci ac. Pretium lectus quam id leo in vitae turpis. Magna fermentum iaculis eu non diam phasellus. Nunc sed blandit libero volutpat sed. Cursus risus at ultrices mi tempus imperdiet. In hac habitasse platea dictumst. In hac habitasse platea dictumst. Hac habitasse platea dictumst quisque sagittis. Elementum sagittis vitae et leo duis ut diam quam nulla. Massa tincidunt nunc pulvinar sapien et ligula. Amet est placerat in egestas erat imperdiet sed. Habitasse platea dictumst quisque sagittis purus. Duis at tellus at urna condimentum mattis pellentesque id nibh.

Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. At auctor urna nunc id cursus metus aliquam eleifend mi. Consectetur adipiscing elit ut aliquam purus. Tristique senectus et netus et. Ut sem viverra aliquet eget sit amet tellus cras. Maecenas ultricies mi eget mauris. Congue quisque egestas diam in arcu cursus. Integer vitae justo eget magna. Turpis in eu mi bibendum. Nibh sit amet commodo nulla facilisi. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Urna porttitor rhoncus dolor purus non enim. Suspendisse sed nisi lacus sed viverra. Facilisis gravida neque convallis a cras semper auctor neque vitae. Tellus elementum sagittis vitae et leo duis ut diam quam.

Lacinia at quis risus sed. Ipsum dolor sit amet consectetur adipiscing elit duis. Blandit turpis cursus in hac. Sagittis orci a scelerisque purus semper eget duis. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Auctor eu augue ut lectus arcu bibendum at. Nisi lacus sed viverra tellus in. Commodo nulla facilisi nullam vehicula ipsum a arcu. Sed id semper risus in hendrerit. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Commodo elit at imperdiet dui accumsan sit. Lorem ipsum dolor sit amet. Feugiat in ante metus dictum at tempor commodo ullamcorper. Id volutpat lacus laoreet non curabitur. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Sit amet nulla facilisi morbi tempus iaculis. Augue lacus viverra vitae congue eu consequat.

Turpis massa tincidunt dui ut ornare lectus. Nulla facilisi nullam vehicula ipsum. Enim diam vulputate ut pharetra sit. Vitae et leo duis ut diam quam nulla porttitor. Aliquam sem et tortor consequat id porta nibh. Venenatis cras sed felis eget. Metus vulputate eu scelerisque felis. Ut sem viverra aliquet eget. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Elementum nibh tellus molestie nunc non. Feugiat in fermentum posuere urna. Pellentesque elit eget gravida cum. Tincidunt vitae semper quis lectus. Feugiat vivamus at augue eget. Nulla facilisi cras fermentum odio eu feugiat. Malesuada fames ac turpis egestas maecenas pharetra. Magna fringilla urna porttitor rhoncus dolor. Eu turpis egestas pretium aenean pharetra magna ac.`,
  needRepair: true,
  reply: '',
  isReplied: false,
  isFinished: false,
  createTime: new Date('2019-08-31T03:50:40.816Z')
}

export { exampleRoom, exampleProfile, exampleIssue }
