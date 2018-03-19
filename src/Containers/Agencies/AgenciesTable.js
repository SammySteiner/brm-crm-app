import React from 'react'
import AgenciesList from './AgenciesList.js'
import { Table } from 'semantic-ui-react'

export default(props) => {

  function formattedAgenciesList(){
    let sortedList = []
    let agenciesList = props.sortedAndFilteredList
    for (var i = 0; i < agenciesList.length; i++) {
      sortedList.push(<AgenciesList
        key={i}
        handleSelectAgency={props.handleSelectAgency}
        agencies={agenciesList[i]}
      />)
    }
    return sortedList
  }

  return(
      <Table striped selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={props.column === 'name' ? props.direction : null} onClick={props.handleSort('name')} >Name</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'acronym' ? props.direction : null} onClick={props.handleSort('acronym')} >Acronym</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'cio' ? props.direction : null} onClick={props.handleSort('cio')} >CIO</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'commissioner' ? props.direction : null} onClick={props.handleSort('commissioner')} >Commissioner</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'arm' ? props.direction : null} onClick={props.handleSort('arm')}>ARM</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'mayoral' ? props.direction : null} onClick={props.handleSort('mayoral')}>Mayoral</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body >
          {formattedAgenciesList()}
        </Table.Body>
      </Table>
  )
}
