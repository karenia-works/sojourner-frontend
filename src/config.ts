export default {
  backend: {
    address: 'https://sojourner.rynco.me/api/v1/',
    tokenEndpoint: 'https://sojourner.rynco.me/connect/token',
    userEndpoint: 'user',
    searchEndpoint: 'room',
    imageEndpoint: 'image',
    issueEndpoint: 'issue',
    roomEndpoint: (id: string) => `room/${id}`,
    orderEndpoint: (id: string) => `order/${id}`,
    descreteIssueEndpoint: (id: string) => `issue/${id}`,
    ProfileEndpoint: `profile`,
    profileEndpoint: (id: string) => `profile/${id}`,
    orderByUser: `order/for_user`,
    orderByHouse: `order/for_house`,
  },
  auth: {
    client_id: 'client',
    client_secret: 'client'
  }
}
