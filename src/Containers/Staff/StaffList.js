import React from 'react'
import { Table } from 'semantic-ui-react'
import './StaffList.css'

export default (props) => {
  return (
    <Table.Row id={props.staff.id} onClick={props.handleSelectStaff}>
      <Table.Cell singleLine >{props.staff.fullname}</Table.Cell>
      <Table.Cell>{props.staff.role}</Table.Cell>
      <Table.Cell singleLine >{ props.staff.agency ? props.staff.agency.name : 'N/A'}</Table.Cell>
      <Table.Cell>{props.staff.email}</Table.Cell>
      <Table.Cell>{props.staff.office_phone}</Table.Cell>
    </Table.Row>

  )
}
