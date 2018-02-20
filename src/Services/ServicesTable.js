import React from 'react'
import ServicesList from './ServicesList.js'
import { Container, Table } from 'semantic-ui-react'


export default(props) => {

  function formattedServicesList(){
    let sortedList = []
    let servicesList = props.sortedAndFilteredList
    for (var i = 0; i < servicesList.length; i++) {
      sortedList.push(<ServicesList
        key={i}
        services={servicesList[i]}
        handleSelectService={props.handleSelectService}
        handleSelectStaff={props.handleSelectStaff}
      />)
    }
    return sortedList
  }

  return(
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell onClick={props.handleSortTitle.bind(this)} >Title</Table.HeaderCell>
          <Table.HeaderCell onClick={props.handleSortDescription.bind(this)} >Description</Table.HeaderCell>
          <Table.HeaderCell onClick={props.handleSortDivision.bind(this)} >Division</Table.HeaderCell>
          <Table.HeaderCell onClick={props.handleSortSDL.bind(this)} >SDL</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {formattedServicesList()}
      </Table.Body>
    </Table>
  )
}
