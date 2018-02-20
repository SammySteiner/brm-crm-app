import React from 'react'
import { Table } from 'semantic-ui-react'
import './AgenciesList.css'

export default (props) => {
  return (
    <Table.Row>
      <Table.Cell singleLine selectable className='test' onClick={props.handleSelectAgency} id={props.agencies.id}>{props.agencies.name.toLowerCase()}</Table.Cell>
      <Table.Cell singleLine selectable className='test' onClick={props.handleSelectAgency} id={props.agencies.id}> {props.agencies.acronym}</Table.Cell>
      <Table.Cell singleLine className='test' selectable onClick={props.agencies.cio ? props.handleSelectStaff : null} id={props.agencies.cio ? props.agencies.cio.id : null}> {props.agencies.cio ? props.agencies.cio.fullname : ""}</Table.Cell>
      <Table.Cell singleLine className='test' selectable onClick={props.agencies.commissioner ? props.handleSelectStaff : null} id={props.agencies.commissioner ? props.agencies.commissioner.id : null}> {props.agencies.commissioner ? props.agencies.commissioner.fullname : ""}</Table.Cell>
      <Table.Cell singleLine className='test' selectable onClick={props.agencies.arm ? props.handleSelectStaff : null} id={props.agencies.arm ? props.agencies.arm.id : null}> {props.agencies.arm ? props.agencies.arm.fullname : ""}</Table.Cell>
      <Table.Cell className='test'>{props.agencies.mayoral ? "Yes" : "No"}</Table.Cell>
    </Table.Row>

  )
}
