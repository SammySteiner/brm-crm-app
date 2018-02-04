import React from 'react'

export default (props) => {
  return(
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* add warning if name is the same as agencyNames */}
        <label>Agency Name: </label>
        <input type='text' value={props.name} onChange={props.handleInputChange} id='name'></input>
      </div>
      <div>
        {/* add warning if acronym is the same as agencyAcronyms */}
        <label>Agency Acronym: </label>
        <input type='text' value={props.acronym} onChange={props.handleInputChange} id='acronym'></input>
      </div>
      <div>
        <label>Agency Address: </label>
        <input type='text' value={props.address} onChange={props.handleInputChange} id='address'></input>
      </div>
      <div>
        <label>Category: </label>
          <label>
            <input type="radio" id="category" value="1" checked={props.category === "1"} onChange={props.handleInputChange}></input>1
          </label>
          <label>
            <input type="radio" id="category" value="2" checked={props.category === "2"} onChange={props.handleInputChange}></input>2
          </label>
          <label>
            <input type="radio" id="category" value="3" checked={props.category === "3"} onChange={props.handleInputChange}></input>3
          </label>
      </div>
      <div>
        <label>Mayoral? </label>
        <input id='mayoral' type='checkbox' checked={props.mayoral} onChange={props.handleInputChange}></input>
      </div>
      <div>
        <label>Access to CityNet? </label>
        <input id='citynet' type='checkbox' checked={props.citynet} onChange={props.handleInputChange}></input>
      </div>
      <button type='submit' onClick={props.handleSubmit}>Submit</button>
    </form>
  )
}
