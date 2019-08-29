export default {
  backend: {
    address: 'https://sojourner.rynco.me/api/v1/',
    tokenEndpoint: '/connect/token',
    userEndpoint: 'user',
    searchEndpoint: 'room',
    imageEndpoint: 'image',
    issueEndpoint: 'issue',
    roomEndpoint: (id: string) => `room/${id}`,
    orderEndpoint: (id: string) => `order/${id}`,
    descreteIssueEndpoint: (id: string) => `issue/${id}`
  },
  auth: {
    client_id: '',
    client_secret: ''
  }
}
