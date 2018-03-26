import React from 'react'
import EngagementsList from './EngagementsList.js'
import { Table, Dropdown } from 'semantic-ui-react'

export default(props) => {

  function formattedConnectionsList(){
    return props.sortedAndFilteredList.map( (e, i) => {
      return (
        <EngagementsList
          key={i}
          handleSelectEngagement={props.handleSelectEngagement}
          engagements={e}
        />
      )
    })  }

  return(
      <Table striped selectable sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={props.column === 'date' ? props.direction : null} onClick={props.handleSort('date')} >Date</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'agency' ? props.direction : null} onClick={props.handleSort('agency')} >
              Agency
            </Table.HeaderCell>
            <Table.HeaderCell >Title</Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'type' ? props.direction : null} onClick={props.handleSort('type')} >
              Engagement Type
              <Dropdown icon='filter'>
                <Dropdown.Menu>
                  {props.types.map( t => <Dropdown.Item key={t} id='type' content={t} onClick={props.handleFilter} />)}
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'arm' ? props.direction : null} onClick={props.handleSort('arm')}>
              ARM
              <Dropdown icon='filter'>
                <Dropdown.Menu>
                  {props.arms.map( a => <Dropdown.Item key={a} id='arm' content={a} onClick={props.handleFilter} />)}
                </Dropdown.Menu>
              </Dropdown>
            </Table.HeaderCell>
            <Table.HeaderCell sorted={props.column === 'priority' ? props.direction : null} onClick={props.handleSort('priority')}>
              Priority
              <Dropdown icon='filter'>
                <Dropdown.Menu>
                  {['All', 1, 2, 3].map( p => <Dropdown.Item key={p} id='priority' content={p} onClick={props.handleFilter} />)}
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
