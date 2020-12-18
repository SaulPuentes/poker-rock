import { presenceChannel } from '../util/channel'

const headers = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'es-ES,es;q=0.9',
  'content-type': 'application/json;charset=UTF-8',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin'
}

export const addMove = async (params) => {
  const url = 'http://localhost:3000/api/game/'
  try {
    const data = await fetch(`${url}`,
      { method: 'PATCH',
        headers,
        body: JSON.stringify(params)
    })
    return await data.json()
  } catch (error) {
    console.log('error: ', error);
  }
}

export const addPlayer = async (player) => {
  const url = 'http://localhost:3000/api/auth/pusher'

  const socketId =  presenceChannel.pusher.connection.socket_id;

  const newParams = {
    player,
    socket_id: socketId,
    channel_name: presenceChannel.name
  }

  try {
    const data = await fetch(`${url}`,
      { method: 'POST',
        headers,
        body: JSON.stringify(newParams)
    })
    const json = await data.json()

    console.log('json: ', json);

  } catch (error) {
    console.log('error: ', error);
  }
}

export const apiTodo = async (params) => {
  const url = 'http://localhost:3000/api/add-task'
  try {
    const response = await fetch(`${url}`, 
      { method: 'POST',
        headers,
        body: JSON.stringify(params)
    })
    console.log('response: ', response);
  } catch (error) {
    console.log('error: ', error);
  }
}