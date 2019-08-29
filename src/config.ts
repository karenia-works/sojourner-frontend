export default {
  backend: {
    address: 'https://sojourner.rynco.me/api/v1',
    tokenEndpoint: '/auth/login',
    userEndpoint: '/user',
    searchEndpoint: '/room',
    imageEndpoint: '/image',
    roomEndpoint: (id: string) => `/room/${id}`,
    orderEndpoint: (id: string) => `/order/${id}`,
  },
  auth: {
    client_id: '',
    client_secret: '',
  },
}
