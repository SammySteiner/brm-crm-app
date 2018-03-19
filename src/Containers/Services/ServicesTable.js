import React from 'react'
import ServicesList from './ServicesList.js'
import { Table } from 'semantic-ui-react'


export default(props) => {

  function formattedServicesList(){
    let sortedList = []
    let servicesList = props.sortedAndFilteredList
    for (var i = 0; i < servicesList.length; i++) {
      sortedList.push(<ServicesList
        key={i}
        services={servicesList[i]}
        handleSelectService={props.handleSelectService}
      />)
    }
    return sortedList
  }

  return(
    <Table striped selectable sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell sorted={props.column === 'title' ? props.direction : null} onClick={props.handleSort('title')} >Title</Table.HeaderCell>
          <Table.HeaderCell sorted={props.column === 'description' ? props.direction : null} onClick={props.handleSort('description')} >Description</Table.HeaderCell>
          <Table.HeaderCell sorted={props.column === 'division' ? props.direction : null} onClick={props.handleSort('division')} >Division</Table.HeaderCell>
          <Table.HeaderCell sorted={props.column === 'sdl' ? props.direction : null} onClick={props.handleSort('sdl')} >SDL</Table.HeaderCell>
          <Table.HeaderCell sorted={props.column === 'service_owner' ? props.direction : null} onClick={props.handleSort('service_owner')} >Service Owner</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {formattedServicesList()}
      </Table.Body>
    </Table>
  )
}
