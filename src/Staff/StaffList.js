import React from 'react'

export default (props) => {
  return (
    <tr>
      <td onClick={props.handleSelectStaff} id={props.staff.id}>{props.staff.fullname}</td>
      <td>{props.staff.role.title}</td>
      <td onClick={props.handleSelectAgency} id={props.staff.agency ? props.staff.agency.id : null}>{ props.staff.agency ? props.staff.agency.name : 'N/A'}</td>
      <td>{props.staff.email}</td>
      <td>{props.staff.office_phone}</td>
    </tr>

  )
}
