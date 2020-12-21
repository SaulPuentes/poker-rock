import Game from '@models/Game';
import User from '@models/User';

/**
 * @description The base url where to make the requests.
 * @type {string}
 */
const baseUrl = 'http://localhost:3000';

/**
 * @description The default http headers to set for each request.
 * @type {Object}
 */
const headers = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'es-ES,es;q=0.9',
  'content-type': 'application/json;charset=UTF-8',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin'
}

/**
 * @description Calls the api to request to start a new game.
 * @param {Game} game The game to create.
 * @returns {Promise<boolean>} The promise of a boolean, ```true``` when successful, ```false``` otherwise. 
 */
export const gamesCreate = async (game) => {
  const url = `${baseUrl}/api/games`;
  const params = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ players: game.players})
  };
  const data = await fetch(url, params);
  if(data.status === 201) {
    const response = data.json();
    return response;
  }
  return false;
}

/**
 * @description Calls the api to select a game's data.
 * @param {Game} game The game containing the id from where to get the data.
 * @returns {Promise<boolean>} The promise of a boolean, ```true``` when successful, ```false``` otherwise. 
 */
export const gamesRead = async (game) => {
  const url = `${baseUrl}/api/games/${game.id}`;
  const data = {
    headers: headers,
    method: 'GET'
  };
  const response = await fetch(url, data);
  if(response.status === 200) {
    const json = response.json();
    for(const player in json._players) {
      game.players.push(player);
    }
    for(const movement in json._movements) {
      game.movements.push(movement);
    }
    return true;
  }
  return false;
}

/**
 * @description Calls the api to select a game's data.
 * @param {Game} game The game with the matching id of the game to delete.
 * @returns {Promise<boolean>} The promise of a boolean, ```true``` when successful, ```false``` otherwise. 
 */
export const gamesDelete = async (game) => {
  const url = `${baseUrl}/api/games/${game.id}`;
  const data = {
    headers: headers,
    method: 'DELETE'
  };
  const response = await fetch(url, data);
  return response.status === 200;
}

/**
 * @description Adds a new movement to a game.
 * @param {string} gameId A valid game id.
 * @param {{
 *  player:string,
 *  movement:string,
 *  bet:number|undefined
 * }} movement The movement to add
 * @returns {Promise<boolean>} The promise of a boolean, ```true``` when successful, ```false``` otherwise.
 */
export const movementsAdd = async (gameId, movement) => {
  const url = `${baseUrl}/api/games/${gameId}/movements`;
  const data = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(movement)
  };
  const response = await fetch(url, data);
  return response.status === 201;
}

/**
 * @description Requestes the creation of the given user.
 * @param {User} user The user to be create.
 * @returns {Promise<boolean>} The promise of a boolean, ```true``` when successful, ```false``` otherwise.
 */
export const usersCreate = async (user) => {
  const url = `${baseUrl}/api/users`;
  const data = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(user)
  };
  const response = await fetch(url, data);
  if(response.status === 201) {
    const json = response.json();
    user.name = json.username;
    user.score = json.score;
    return true;
  }
  return false;
}

/**
 * @description Requestes the selection of the given user.
 * @param {User} user The user to be selected by id.
 * @returns {Promise<boolean>} The promise of a boolean, ```true``` when successful, ```false``` otherwise.
 */
export const usersRead = async (user) => {
  const url = `${baseUrl}/api/users/${user.id}`;
  const data = {
    headers: headers,
    method: 'GET'
  };
  const response = await fetch(url, data);
  if(response.status === 200) {
    const json = response.json();
    user.name = json.username;
    user.score = json.score;
    return true;
  }
  return false;
}

/**
 * @description Requestes an array of users sorted by score.
 * @param {User[]} list An empty array to list the users.
 * @param {booelan} descending ```True``` to get descending list, ```false``` to get it ascending.
 * @param {number} count The amount of users to select.
 * @returns {Promise<boolean>} The promise of a boolean, ```true``` when successful, ```false``` otherwise.
 */
export const usersReadScores = async (list, descending = true, count = 10) => {
  const url = `${baseUrl}/api/users/scores?descending=${descending}&count=${count}`;
  const data = {
    headers: headers,
    method: 'GET'
  };
  const response = await fetch(url, data);
  if(response.status === 200) {
    const json = response.json();
    json.forEach(u => list.push(u));
    return true;
  }
  return false;
}

/**
 * @description Requestes the deletion of the given user.
 * @param {User} user The user to be deleted by id.
 * @returns {Promise<boolean>} The promise of a boolean, ```true``` when successful, ```false``` otherwise.
 */
export const usersDelete = async (user) => {
  const url = `${baseUrl}/api/users/${user.id}`;
  const data = {
    headers: headers,
    method: 'DELETE'
  };
  const response = await fetch(url, data);
  return response.status === 200;
}

export default {
  games: {
    create: gamesCreate,
    read: gamesRead,
    delete: gamesDelete,
    movements: {
      add: movementsAdd
    }
  },
  users: {
    create: usersCreate,
    read: usersRead,
    delete: usersDelete,
    scores: {
      read: usersReadScores
    }
  }
}
