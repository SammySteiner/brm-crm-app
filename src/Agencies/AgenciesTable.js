import React from 'react'
import AgenciesList from './AgenciesList.js'
import { Container, Table } from 'semantic-ui-react'

export default(props) => {

  function formattedAgenciesList(){
    let sortedList = []
    let agenciesList = props.sortedAndFilteredList
    for (var i = 0; i < agenciesList.length; i++) {
      sortedList.push(<AgenciesList
        key={i}
        handleSelectAgency={props.handleSelectAgency}
        handleSelectStaff={props.handleSelectStaff}
        agencies={agenciesList[i]}
      />)
    }
    return sortedList
  }

  return(
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={props.handleSortName.bind(this)} >Name</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortAcronym.bind(this)} >Acronym</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortCIO.bind(this)} >CIO</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortCommissioner.bind(this)} >Commissioner</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortARM.bind(this)} >ARM</Table.HeaderCell>
            <Table.HeaderCell onClick={props.handleSortMayoral.bind(this)} >Mayoral</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body >
          {formattedAgenciesList()}
        </Table.Body>
      </Table>
  )
}
