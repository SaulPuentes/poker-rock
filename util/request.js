const headers = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'es-ES,es;q=0.9',
  'content-type': 'application/json;charset=UTF-8',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin'
}
const baseURL = process.env.BASE_URL; //http://localhost:3000';


export async function getScores() {
  const data = await fetch('/api/users/scores', {
      method: 'GET',
      headers
  })

  const json = await data.json()
  console.log('json: ', json);
  return json
}

export const addMove = async (params) => {
  const url = baseURL+ '/api/game/'
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
  const url = baseURL + '/api/player/add'; 
  try {
    const data = await fetch(`${url}`,
      { method: 'POST',
        headers,
        body: JSON.stringify(player)
    })
    const json = await data.json()

    return json

  } catch (error) {
    console.log('error: ', error);
  }
}

export const apiTodo = async (params) => {
  const url = baseURL + '/api/add-task'
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