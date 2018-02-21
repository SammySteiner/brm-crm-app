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
        handleSelectAgency={props.handleSelectAgency}
      />)
    }
    return sortedList
  }

  return(
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell onClick={props.handleSortName.bind(this)} >Name</Table.HeaderCell>
          <Table.HeaderCell onClick={props.handleSortRole.bind(this)} >Role</Table.HeaderCell>
          <Table.HeaderCell onClick={props.handleSortAgency.bind(this)} >Agency</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Office Phone</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {formattedStaffList()}
      </Table.Body>
    </Table>
  )
}
