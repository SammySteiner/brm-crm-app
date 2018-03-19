import React from 'react'
import { Table } from 'semantic-ui-react'
import './AgenciesList.css'

export default (props) => {
  return (
    <Table.Row id={props.agencies.id} onClick={props.handleSelectAgency}>
      <Table.Cell singleLine className='test'>{props.agencies.name.toLowerCase()}</Table.Cell>
      <Table.Cell singleLine  className='test'> {props.agencies.acronym}</Table.Cell>
      <Table.Cell singleLine className='test'> {props.agencies.cio ? props.agencies.cio.fullname : ""}</Table.Cell>
      <Table.Cell singleLine className='test'> {props.agencies.commissioner ? props.agencies.commissioner.fullname : ""}</Table.Cell>
      <Table.Cell singleLine className='test'> {props.agencies.arm ? props.agencies.arm.fullname : ""}</Table.Cell>
      <Table.Cell className='test'>{props.agencies.mayoral ? "Yes" : "No"}</Table.Cell>
    </Table.Row>

  )
}
