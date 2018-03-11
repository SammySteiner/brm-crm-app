import React from 'react'
import { Table } from 'semantic-ui-react'
import './ConnectionsList.css'

export default (props) => {
  var d = props.connections.date ? new Date(props.connections.date).toDateString() : "Date not available"
  return (
    <Table.Row>
      <Table.Cell singleLine className='test' id={props.connections.id}>{d}</Table.Cell>
      <Table.Cell singleLine selectable className='test' onClick={props.handleSelectAgency} id={props.connections.id}>{props.connections.agencies[0].name.toLowerCase()}</Table.Cell>
      <Table.Cell singleLine className='test' > {props.connections.notes}</Table.Cell>
      <Table.Cell singleLine className='test' selectable onClick={props.handleSelectConnectionType} id={props.connections.connection_type.id}> {props.connections.connection_type.via}</Table.Cell>
      <Table.Cell singleLine className='test' selectable > {props.connections.staff[0].fullname}</Table.Cell>
      {/* <Table.Cell singleLine className='test' selectable onClick={props.agencies.arm ? props.handleSelectStaff : null} id={props.agencies.arm ? props.agencies.arm.id : null}> {props.agencies.arm ? props.agencies.arm.fullname : ""}</Table.Cell> */}
      <Table.Cell className='test'>{props.connections.engagements.length}</Table.Cell>
    </Table.Row>

  )
}
