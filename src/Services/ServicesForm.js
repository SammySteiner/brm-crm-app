import React from 'react'

export default (props) => {
  var staff = props.staffNames.sort().map( (s, i) => <option key={i} value={s}>{s}</option>)
  var divisions = props.divisionNames.map( (d, i) => <option key={i} value={d}>{d}</option>)
  return(
    <form onSubmit={props.handleSubmit}>
      <div>
        <label>Service Title: </label>
        <input type='text' value={props.title} onChange={props.handleInputChange} id='title'></input>
      </div>
      <div>
        <label>Service Description: </label>
        <textarea value={props.description} onChange={props.handleInputChange} id='description'></textarea>
      </div>
      <div>
        <label>SLA: </label>
        <input type='number' value={props.sla} onChange={props.handleInputChange} id='sla'></input>
      </div>
      <div>
        <label>SDL:
          <select value={props.sdl} id='sdl' onChange={props.handleInputChange}>
            <option></option>
            {staff}
          </select>
        </label>
      </div>
      <div>
        <label>Division:
          <select value={props.division} id='division' onChange={props.handleInputChange}>
            <option></option>
            {divisions}
          </select>
        </label>
      </div>

      <button type='submit' onClick={props.handleSubmit}>Submit</button>
    </form>
  )
}
