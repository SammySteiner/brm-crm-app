import React from 'react'
import { Table } from 'semantic-ui-react'
import '../../Capitalize.css'

export default (props) => {
  return (
    <Table.Row id={props.services.id} onClick={props.handleSelectService}>
      <Table.Cell width={4} className='capitalize'>{props.services.title.toLowerCase()}</Table.Cell>
      <Table.Cell >{props.services.description}</Table.Cell>
      <Table.Cell >{props.services.division ? props.services.division : ""}</Table.Cell>
      <Table.Cell singleLine >{props.services.sdl ? props.services.sdl.fullname : ""}</Table.Cell>
      <Table.Cell singleLine >{props.services.service_owner ? props.services.service_owner.fullname : ""}</Table.Cell>
    </Table.Row>
  )
}
