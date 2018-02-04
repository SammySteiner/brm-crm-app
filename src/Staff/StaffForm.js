import React from 'react'

export default (props) => {

  var agencies = props.agencyNames.map( (a, i) => <option key={i} value={a}>{a}</option>)
  var services = props.services.map( (s , i) => <option key={i} value={s}>{s}</option>)

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
          <select value={props.service} id='service' onChange={props.handleInputChange}>
            <option></option>
            {services}
          </select>
        </label>
      </div>
      : null}

      <button type='submit' onClick={props.handleSubmit}>Submit</button>
    </form>
  )
}
