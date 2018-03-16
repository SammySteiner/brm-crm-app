import React from 'react'
import ConnectionsList from './ConnectionsList.js'
import { Table } from 'semantic-ui-react'

export default(props) => {

  function formattedConnectionsList(){
    return props.sortedAndFilteredList.map( (c, i) => {
      return (
        <ConnectionsList
          key={i}
          handleSelectAgency={props.handleSelectAgency}
          handleSelectStaff={props.handleSelectStaff}
          handleSelectConnection={props.handleSelectConnection}
          handleSelectConnectionType={props.handleSelectConnectionType}
          connections={c}
        />
      )
    })
  }

  return(
      <Table striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={props.handleSortDate.bind(this)} >Date</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortAgency.bind(this)} >Agency</Table.HeaderCell>
            <Table.HeaderCell >Report</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortConnectionType.bind(this)} >Type</Table.HeaderCell>
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
