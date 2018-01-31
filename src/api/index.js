var DB_URL = "http://localhost:3000/api/v1/"

export function getAgencies(){
  return fetch(DB_URL + "agencies", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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
    },
    method: 'GET',
  })
    .then(response => response.json())
}

export function deleteResource(resource, id){
  return fetch(DB_URL + resource + "/" + id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify( { [resource]: {id: id} } )
  })
  .then( res => res.json() )
}
