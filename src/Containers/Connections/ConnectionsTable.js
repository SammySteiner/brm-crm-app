import React from 'react'
import ConnectionsList from './ConnectionsList.js'
import { Table } from 'semantic-ui-react'

export default(props) => {

  function formattedConnectionsList(){
    let sortedList = []
    let connectionsList = props.sortedAndFilteredList
    for (var i = 0; i < connectionsList.length; i++) {
      sortedList.push(<ConnectionsList
        key={i}
        handleSelectAgency={props.handleSelectAgency}
        handleSelectStaff={props.handleSelectStaff}
        handleSelectConnectionType={props.handleSelectConnectionType}
        connections={connectionsList[i]}
      />)
    }
    return sortedList
  }

  return(
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={props.handleSortDate.bind(this)} >Date</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortAgency.bind(this)} >Agency</Table.HeaderCell>
            <Table.HeaderCell >Notes</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortConnectionType.bind(this)} >Connection Type</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortARM.bind(this)} >ARM</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortNumberOfEngagements.bind(this)} >Number of Engagements</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body >
          {formattedConnectionsList()}
        </Table.Body>
      </Table>
  )
}
