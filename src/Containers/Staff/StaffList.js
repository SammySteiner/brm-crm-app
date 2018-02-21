import React from 'react'
import { Table } from 'semantic-ui-react'
import './StaffList.css'

export default (props) => {
  return (
    <Table.Row>
      <Table.Cell singleLine selectable className='test' onClick={props.handleSelectStaff} id={props.staff.id}>{props.staff.fullname}</Table.Cell>
      <Table.Cell>{props.staff.role.title}</Table.Cell>
      <Table.Cell singleLine selectable className='test' onClick={props.handleSelectAgency} id={props.staff.agency ? props.staff.agency.id : null}>{ props.staff.agency ? props.staff.agency.name.toLowerCase() : 'N/A'}</Table.Cell>
      <Table.Cell>{props.staff.email}</Table.Cell>
      <Table.Cell>{props.staff.office_phone}</Table.Cell>
    </Table.Row>

  )
}
