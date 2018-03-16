import React from 'react'
import EngagementsList from './EngagementsList.js'
import { Table } from 'semantic-ui-react'

export default(props) => {

  function formattedConnectionsList(){
    return props.sortedAndFilteredList.map( (e, i) => {
      return (
        <EngagementsList
          key={i}
          handleSelectEngagement={props.handleSelectEngagement}
          engagements={e}
        />
      )
    })  }

  return(
      <Table striped selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={props.column === 'date' ? props.direction : null} onClick={props.handleSort('date')} >Date</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'agency' ? props.direction : null} onClick={props.handleSort('agency')} >Agency</Table.HeaderCell>
            <Table.HeaderCell >Title</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'type' ? props.direction : null} onClick={props.handleSort('type')} >Engagement Type</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'arm' ? props.direction : null} onClick={props.handleSort('arm')}>ARM</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'priority' ? props.direction : null} onClick={props.handleSort('priority')}>Priority</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body >
          {formattedConnectionsList()}
        </Table.Body>
      </Table>
  )
}
