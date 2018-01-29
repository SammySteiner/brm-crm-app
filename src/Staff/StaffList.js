import React from 'react'

export default (props) => {
  return (
    <tr>
      <td>{props.staff.fullname}</td>
      <td>{props.staff.role.title}</td>
      <td>{props.staff.agency.name}</td>
      <td>{props.staff.email}</td>
      <td>{props.staff.office_phone}</td>
    </tr>

  )
}
