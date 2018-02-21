import React from 'react'
import { Table } from 'semantic-ui-react'
import './ServicesList.css'


export default (props) => {
  return (
    <Table.Row>
      <Table.Cell singleLine selectable className='test' onClick={props.handleSelectService} id={props.services.id}>{props.services.title}</Table.Cell>
      <Table.Cell >{props.services.description}</Table.Cell>
      <Table.Cell >{props.services.division ? props.services.division.name : ""}</Table.Cell>
      <Table.Cell singleLine selectable className='test' onClick={props.handleSelectStaff} id={props.services.sdl ? props.services.sdl.id : null}>{props.services.sdl ? props.services.sdl.fullname : ""}</Table.Cell>
    </Table.Row>
  )
}
