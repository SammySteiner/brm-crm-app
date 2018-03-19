import React from 'react'
import StaffList from './StaffList.js'
import { Table } from 'semantic-ui-react'

export default(props) => {

  function formattedStaffList(){
    let sortedList = []
    let staffList = props.sortedAndFilteredList
    for (var i = 0; i < staffList.length; i++) {
      sortedList.push(<StaffList
        key={i}
        staff={staffList[i]}
        handleSelectStaff={props.handleSelectStaff}
      />)
    }
    return sortedList
  }

  return(
    <Table striped selectable sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell sorted={props.column === 'name' ? props.direction : null} onClick={props.handleSort('name')} >Name</Table.HeaderCell>
          <Table.HeaderCell sorted={props.column === 'role' ? props.direction : null} onClick={props.handleSort('role')} >Role</Table.HeaderCell>
          <Table.HeaderCell sorted={props.column === 'agency' ? props.direction : null} onClick={props.handleSort('agency')} >Agency</Table.HeaderCell>
          <Table.HeaderCell sorted={props.column === 'email' ? props.direction : null} onClick={props.handleSort('email')}>Email</Table.HeaderCell>
          <Table.HeaderCell sorted={props.column === 'office_phone' ? props.direction : null} onClick={props.handleSort('office_phone')}>Office Phone</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {formattedStaffList()}
      </Table.Body>
    </Table>
  )
}
