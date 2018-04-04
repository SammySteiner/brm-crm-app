import React from 'react'
import ConnectionsList from './ConnectionsList.js'
import { Table, Dropdown } from 'semantic-ui-react'

export default(props) => {

  function formattedConnectionsList(){
    return props.sortedAndFilteredList.map( (c, i) => {
      return (
        <ConnectionsList
          key={i}
          handleSelectConnection={props.handleSelectConnection}
          connections={c}
        />
      )
    })
  }

  return(
      <Table striped selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={props.column === 'date' ? props.direction : null} onClick={props.handleSort('date')} >Date</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'agency' ? props.direction : null} onClick={props.handleSort('agency')} >Agency</Table.HeaderCell>
            <Table.HeaderCell >Report</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'type' ? props.direction : null} onClick={props.handleSort('type')}>
              Type
              <Dropdown icon='filter'>
                <Dropdown.Menu>
                  {props.types.map( t => <Dropdown.Item key={t} id='type' content={t} onClick={props.handleFilter} />)}
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'arm' ? props.direction : null} onClick={props.handleSort('arm')} >
              ARM
              <Dropdown icon='filter'>
                <Dropdown.Menu>
                  {props.arms.map( t => <Dropdown.Item key={t} id='arm' content={t} onClick={props.handleFilter} />)}
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'engagements' ? props.direction : null} onClick={props.handleSort('engagements')}>
              Engagements
              <Dropdown icon='filter'>
                <Dropdown.Menu>
                  {props.engagements.map( t => <Dropdown.Item key={t} id='engagements' content={t} onClick={props.handleFilter} />)}
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body >
          {formattedConnectionsList()}
        </Table.Body>
      </Table>
  )
}
