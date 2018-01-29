import React from 'react'

export default (props) => {
  return (
    <tr>
      <td>{props.agencies.name}</td>
      <td>{props.agencies.acronym}</td>
      <td>{props.agencies.cio ? props.agencies.cio.fullname : ""}</td>
      <td>{props.agencies.commissioner ? props.agencies.commissioner.fullname : ""}</td>
      <td>{props.agencies.arm ? props.agencies.arm.fullname : ""}</td>
    </tr>

  )
}
