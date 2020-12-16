const headers = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'es-ES,es;q=0.9',
  'content-type': 'application/json;charset=UTF-8',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin'
}

export const apiMove = async (move, params) => {
  const url = 'http://localhost:3000/api/move/'
  try {
    const response = await fetch(`${url}${move}`, 
      { method: 'POST',
        headers,
        body: JSON.stringify(params)
    })
    console.log('response: ', response);
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