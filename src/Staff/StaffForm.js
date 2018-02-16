import React from 'react'

export default (props) => {

  var agencies = props.agencyNames.map( (a, i) => <option key={i} value={a}>{a}</option>)
  var services_list = props.services_list.sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).map( (s , i) => <option key={i} value={s.title}>{s.title}</option>)
  var unassigned_sdl_services = props.services_list.filter( s => !s.sdl_id).sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).map( (s , i) => <option key={i} value={s.title}>{s.title}</option>)
  var unassigned_so_services = props.services_list.filter( s => !s.service_owner_id).sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).map( (s , i) => <option key={i} value={s.title}>{s.title}</option>)
  var unassigned_agencies = props.agencies.filter( a => !props.arms.some( arm => arm.agency_id === a.id)).sort( (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map( (ua, i) => <option key={i} value={ua.name}>{ua.name}</option>)
  var roles = []
  if (props.agency === "INFORMATION TECHNOLOGY AND TELECOMMUNICATIONS, DEPARTMENT OF") {
    roles = props.roles.map( (r, i) => <option key={i} value={r}>{r}</option>)
  } else {
    roles = props.roles.filter(  r =>  (r !== "SDL" && r !== "Service Owner" && r !== "ARM Manager" && r !== "ARM" && r !== "Service Provider") ).map( (r, i) => <option key={i} value={r}>{r}</option>)
  }
  return(
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* add warning if name is the same as first_name */}
        <label>Staff First Name: </label>
        <input type='text' value={props.first_name} onChange={props.handleInputChange} id='first_name'></input>
      </div>
      <div>
        {/* add warning if name is the same as last_name */}
        <label>Staff Last Name: </label>
        <input type='text' value={props.last_name} onChange={props.handleInputChange} id='last_name'></input>
      </div>
      <div>
        {/* add warning if name is the same as email */}
        <label>Staff Email: </label>
        <input type='text' value={props.email} onChange={props.handleInputChange} id='email'></input>
      </div>
      <div>
        {/* add warning if name is the same as email */}
        <label>Staff Office Phone: </label>
        <input type='tel' value={props.office_phone} onChange={props.handleInputChange} id='office_phone'></input>
      </div>
      <div>
        {/* add warning if name is the same as email */}
        <label>Staff Cell Phone: </label>
        <input type='tel' value={props.cell_phone} onChange={props.handleInputChange} id='cell_phone'></input>
      </div>
      <div>
        <label>Agency:
          <select value={props.agency} id='agency' onChange={props.handleInputChange}>
            <option></option>
            {agencies}
          </select>
        </label>
      </div>
      <div>
        <label>Role:
          <select value={props.role} id='role' onChange={props.handleInputChange}>
            <option></option>
            {roles}
          </select>
        </label>
      </div>
      {(props.role === "SDL" || props.role === "Service Owner" || props.role === "Service Provider") ?
      <div>
        <label>Service:
          <select multiple={true} value={props.services} id='services' onChange={props.handleInputChange}>
            <option></option>
            {props.path === '/staff/new' && props.role === "SDL" ? unassigned_sdl_services : props.path === '/staff/new' && props.role === "Service Owner" ? unassigned_so_services : services_list}
          </select>
        </label>
      </div>
      : null}
      {props.role === "ARM" ?
      <div>
        <label>Unassigned Agencies:
          <select multiple={true} value={props.assignments} id='assignments' onChange={props.handleInputChange}>
            <option></option>
            {props.path === '/staff/new' ? unassigned_agencies : agencies}
          </select>
        </label>
      </div>
      : null}

      <button type='submit' onClick={props.handleSubmit}>Submit</button>
    </form>
  )
}
