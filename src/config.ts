export default {
  backend: {
    address: 'http://114.116.77.52:8086/api/v1',
    tokenEndpoint: '/auth/login',
    userEndpoint: '/user',
    searchEndpoint: '/room',
    roomEndpoint: (id: string) => `/room/${id}`,
    orderEndpoint: (id: string) => `/order/${id}`
  },
  auth: {
    client_id: '',
    client_secret: ''
  }
}
