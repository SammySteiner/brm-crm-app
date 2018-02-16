var DB_URL = "http://localhost:3000/api/v1/"

export function logIn(params){
  return fetch(DB_URL + 'auth', {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify( params )
  })
  .then( res => res.json() )
}

export function register(params){
  return fetch(DB_URL + 'user', {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify( {user: params} )
  })
  .then( res => res.json() )
}

export function getUserEmails(){
  return fetch(DB_URL + 'user', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, method: 'GET'
  })
  .then(response => response.json())
}


export function getAgencies(){
  return fetch(DB_URL + "agencies", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'GET',
  })
    .then(response => response.json())
}

export function getDirectory(resource){
  return fetch(DB_URL + resource, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'GET',
  })
    .then(response => response.json())
}

export function getDetails(resource, id){
  return fetch(DB_URL + resource + "/" + id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'GET',
  })
    .then(response => response.json())
}

export function deleteResource(resource, id){
  return fetch(DB_URL + resource + "/" + id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'DELETE',
    body: JSON.stringify( { [resource]: {id: id} } )
  })
  .then( res => res.json() )
}

export function fetchFormInfo(form){
  return fetch(DB_URL + form + "FormInfo", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt')
    },
    method: 'GET',
  })
    .then(response => response.json())
}

export function createResource(state, form, url){
  return fetch(DB_URL + url, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  },
  method: 'POST',
  body: JSON.stringify( {[form]: state} )
  })
  .then( res => res.json() )
}

export function editResource(info, form, url){
  return fetch(DB_URL + url + '/' + info.id, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  },
  method: 'PATCH',
  body: JSON.stringify( {[form]: info} )
  })
  .then( res => res.json() )
}
