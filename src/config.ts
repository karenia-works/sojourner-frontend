export default {
  backend: {
    address: 'https://sojourner.rynco.me/api/v1',
    tokenEndpoint: '/auth/login',
    userEndpoint: '/user',
    searchEndpoint: '/room',
    imageEndpoint: '/image',
    ProfileEndpoint: `/profile`,
    profileEndpoint: (id: string) => `/profile/${id}`,
    roomEndpoint: (id: string) => `/room/${id}`,
    orderEndpoint: (id: string) => `/order/${id}`,
    orderByUser: (id: string) => `/order/for_user/${id}`,
    orderByHouse: (id: string) => `/order/for_house/${id}`
  },
  auth: {
    client_id: '',
    client_secret: '',
  },
}
