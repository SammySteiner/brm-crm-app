import React from 'react'
import { Table } from 'semantic-ui-react'

export default (props) => {
  var d = props.engagements.date ? new Date(props.engagements.date).toDateString() : "Date not available"
  return (
    <Table.Row id={props.engagements.id} onClick={props.handleSelectEngagement}>
      <Table.Cell singleLine >{d}</Table.Cell>
      <Table.Cell >{props.engagements.agency.acronym}</Table.Cell>
      <Table.Cell width={8} > {props.engagements.title}</Table.Cell>
      <Table.Cell singleLine > {props.engagements.type}</Table.Cell>
      <Table.Cell singleLine > {props.engagements.arm.fullname}</Table.Cell>
      <Table.Cell singleLine > {props.engagements.priority}</Table.Cell>
    </Table.Row>

  )
}
