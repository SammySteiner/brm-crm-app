import React from 'react'

export default (props) => {
  return (
    <tr>
      <td onClick={props.handleSelectService} id={props.services.id}>{props.services.title}</td>
      <td>{props.services.description}</td>
      <td>{props.services.division ? props.services.division.name : ""}</td>
      <td>{props.services.sdl ? props.services.sdl.fullname : ""}</td>
    </tr>
  )
}
