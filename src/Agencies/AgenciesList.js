import React from 'react'

export default (props) => {
  return (
    <tr>
      <td onClick={props.handleSelectAgency} id={props.agencies.id}>{props.agencies.name}</td>
      <td onClick={props.handleSelectAgency} id={props.agencies.id}>{props.agencies.acronym}</td>
      <td onClick={props.agencies.cio ? props.handleSelectStaff : null} id={props.agencies.cio ? props.agencies.cio.id : null}>{props.agencies.cio ? props.agencies.cio.fullname : ""}</td>
      <td onClick={props.agencies.commissioner ? props.handleSelectStaff : null} id={props.agencies.commissioner ? props.agencies.commissioner.id : null}>{props.agencies.commissioner ? props.agencies.commissioner.fullname : ""}</td>
      <td onClick={props.agencies.arm ? props.handleSelectStaff : null} id={props.agencies.arm ? props.agencies.arm.id : null}>{props.agencies.arm ? props.agencies.arm.fullname : ""}</td>
      <td>{props.agencies.mayoral ? "Yes" : "No"}</td>
    </tr>

  )
}
