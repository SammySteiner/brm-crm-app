import React from 'react'
import { Table } from 'semantic-ui-react'
import './ConnectionsList.css'

export default (props) => {
  var d = props.connections.date ? new Date(props.connections.date).toDateString() : "Date not available"
  return (
    <Table.Row id={props.connections.id} onClick={props.handleSelectConnection}>
      <Table.Cell singleLine className='tester' >{d}</Table.Cell>
      <Table.Cell singleLine className='tester' >{props.connections.agency.acronym}</Table.Cell>
      <Table.Cell width={8} > {props.connections.report}</Table.Cell>
      <Table.Cell singleLine className='tester' > {props.connections.type}</Table.Cell>
      <Table.Cell singleLine className='tester' > {props.connections.arm.fullname}</Table.Cell>
      <Table.Cell className='tester'>{props.connections.engagements}</Table.Cell>
    </Table.Row>

  )
}
