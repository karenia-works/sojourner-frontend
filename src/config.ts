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
    orderByUser: `/order/for_user`,
    orderByHouse: `/order/for_house`
  },
  auth: {
    client_id: '',
    client_secret: '',
  },
}
