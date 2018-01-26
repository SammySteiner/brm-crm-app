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

export function getStaffs(){
  return fetch(DB_URL + "staff", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(response => response.json())
}
