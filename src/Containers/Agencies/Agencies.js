import React, { Component } from 'react'
import AgenciesTable from './AgenciesTable'
import Search from '../Search.js'
import { getDirectory } from '../../api'
import { Button, Grid, Loader } from 'semantic-ui-react'

export default class Agencies extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      search: '',
      column: 'name',
      direction: 'ascending',
    }
  }

  componentDidMount() {
    getDirectory('agencies')
    .then( data => data.sort(function(a, b) {
      var textA = a.name.toUpperCase()
      var textB = b.name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0})
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

  handleSelectAgency(event){
    return this.props.history.push("/agencies/" + event.currentTarget.id)
  }

  newAgency(){
    return this.props.history.push("agencies/new")
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state
    var c = (column !== clickedColumn)
    return this.setState({
      column: clickedColumn,
      data: this.sortBy(data, [clickedColumn], c),
      direction: c ? 'ascending' : direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  sortBy(collection, iterator, c) {
    if (c) {
       if (iterator[0] === "arm" || iterator[0] === "cio" || iterator[0] === "commissioner") {
        return collection.sort(function(x, y) {
          return (x[iterator] === null) ? 1 : (y[iterator] === null) ? -1 : x[iterator].last_name > y[iterator].last_name ? 1 : -1
        })
      } else {
        return collection.sort(function(x, y) {
          return (x[iterator] === null) ? 1 : (y[iterator] === null) ? -1 : x[iterator] > y[iterator] ? 1 : -1
        })
      }
    } else {
      var core = []
      var empty = []
      collection.forEach( c =>
        c[iterator] === null ? empty.push(c) : core.push(c)
      )
      return core.reverse().concat(empty)
    }
  }

  filterData(){
    // remove values from the data for presentation that do not match the search query
    return this.state.data.filter( a =>
      a.name.toLowerCase().includes(this.state.search.toLowerCase()) || (a.acronym ? a.acronym.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (a.cio ?  a.cio.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false ) ||
      (a.commissioner ? a.commissioner.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (a.arm ? a.arm.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false)
    )
  }

  render(){
    const filteredList = this.filterData()
    return(
      !this.state.data[0] ? <Loader active inline='centered' content='Loading'/> :
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column width={2} floated='left' >
              <Button type='button' onClick={this.newAgency.bind(this)}>Add Agencies</Button>
            </Grid.Column>
            <Grid.Column  floated='left' stretched width={10}>
                <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column >
              <AgenciesTable
                sortedAndFilteredList={filteredList}
                handleSelectAgency={this.handleSelectAgency.bind(this)}
                handleSort={this.handleSort.bind(this)}
                direction={this.state.direction}
                column={this.state.column}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

    )
  }
}
