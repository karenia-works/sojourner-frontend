export default {
  backend: {
    address: 'http://114.116.77.52:8086/api/v1',
    tokenEndpoint: '/auth/login',
    userEndpoint: '/user',
    roomEndpoint: (id: string) => `/room/${id}`
  },
  auth: {
    client_id: '',
    client_secret: ''
  }
}
