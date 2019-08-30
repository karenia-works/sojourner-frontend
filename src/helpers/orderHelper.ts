import Axios from 'axios'
import config from '@/config'
import { Order } from '@/models/Room'

async function insertOrder(order: Order) {
  let request = await Axios.post(
    config.backend.address + config.backend.orderEndpoint,
    order
  )
  if (request.status < 200 && request.status >= 300)
    throw new Error(
      `Can not add order! state: ${request.status},id: ${order.id}`
    )
}

async function getOrder(id: string) {
  let tttOrder = await Axios.get(
    config.backend.address + config.backend.orderEndpoint,
    {
      params: {
        oid: id
      }
    }
  )
  if (tttOrder.status == 200) {
    return tttOrder.data
  } else {
    throw new Error('Order not exist!')
  }
}

async function findOrderByRoom(id: string): Promise<Order[]> {
  let Orders = await Axios.get<Order[]>(
    config.backend.address + config.backend.orderByHouse,
    {
      params: {
        oid: id
      }
    }
  )
  if (Orders.status == 200) {
    return Orders.data
  } else throw new Error('findByRoomError')
}

async function findOrderByUser(id: string): Promise<Order[]> {
  let Orders = await Axios.get<Order[]>(
    config.backend.address + config.backend.orderByUser,
    {
      params: {
        user: id
      }
    }
  )
  if (Orders.status == 200) {
    return Orders.data
  } else throw new Error('findByUserError')
}
