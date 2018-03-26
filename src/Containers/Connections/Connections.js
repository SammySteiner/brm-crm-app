import React, { Component } from 'react'

import ConnectionsTable from './ConnectionsTable'
import Search from '../Search.js'

import { getDirectory } from '../../api'
import { Button, Grid, Loader } from 'semantic-ui-react'

export default class Connections extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      search: '',
      column: 'date',
      direction: 'ascending',
      filters: {
        type: '',
        arm: '',
        engagements: ''
      }
    }
  }

  componentDidMount() {
    getDirectory('connections')
    .then( connections => connections.sort(function(a, b) {
      var textA = a.date
      var textB = b.date
      return (textA < textB) ? 1 : (textA > textB) ? -1 : 0})
    )
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })
    .then(data => this.setState({ data }))
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleFilter(event, data){
    var filters = {...this.state.filters}
    var value = data.content === 'All' ? '' : data.content
    filters[data.id] = value
    this.setState({filters})
  }

  handleSelectConnection(event){
    return this.props.history.push("/connections/" + event.currentTarget.id)
  }
  newConnection(){
    return this.props.history.push("connections/new")
  }

  sortBy(collection, iterator) {
    if (iterator[0] === "arm") {
      return collection.sort(function(x, y) {
        return x[iterator].last_name > y[iterator].last_name ? 1 : -1
      })
    } else if (iterator[0] === 'agency') {
      return collection.sort(function(x, y) {
        return x[iterator].acronym > y[iterator].acronym ? 1 : -1
      })
    } else {
      return collection.sort(function(x, y) {
        return x[iterator] > y[iterator] ? 1 : -1
      })
    }
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state
    if (column !== clickedColumn) {
      return this.setState({
        column: clickedColumn,
        data: this.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

    } else {
      return this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }
  }

  render(){

    const filteredList = this.state.data.filter( c =>
      (this.state.filters.arm ? c.arm.fullname === this.state.filters.arm : true) &&
      (this.state.filters.type ? c.type === this.state.filters.type : true) &&
      (this.state.filters.engagements ? c.engagements === this.state.filters.engagements : true)
    )
    const sortedList = filteredList.filter( c =>
      (c.arm ? c.arm.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (c.agency.acronym ? c.agency.acronym.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (c.agency.name ? c.agency.name.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (c.type ? c.type.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (c.date ? new Date(c.date).toDateString().toLowerCase().includes(this.state.search.toLowerCase()): false)
    )
    return(
      !this.state.data[0] ? <Loader active inline='centered' content='Loading'/> :
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column width={2} floated='left' >
              <Button type='button' onClick={this.newConnection.bind(this)}>New Connection</Button>
            </Grid.Column>
            <Grid.Column  floated='left' stretched width={10}>
                <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column >
              <ConnectionsTable
                sortedAndFilteredList={sortedList}
                handleSelectConnection={this.handleSelectConnection.bind(this)}
                handleSort={this.handleSort.bind(this)}
                column={this.state.column}
                direction={this.state.direction}
                handleFilter={this.handleFilter.bind(this)}
                filters={this.state.filters}
                types={['All', ...new Set(this.state.data.map(item => item.type))]}
                arms={['All', ...new Set(this.state.data.map(item => item.arm.fullname))]}
                engagements={['All', ...new Set(this.state.data.map(item => item.engagements))]}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}
