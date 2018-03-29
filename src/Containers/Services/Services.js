import React, { Component } from 'react'
import ServicesTable from './ServicesTable'
import Search from '../Search.js'
import { getDirectory } from '../../api'
import { Button, Grid, Loader } from 'semantic-ui-react'


export default class Services extends Component {
  constructor(){
    super()
    this.state = {
      data: [],
      search: '',
      column: 'title',
      direction: 'ascending',
    }
  }

  componentDidMount() {
    getDirectory('services')
    .then( data => data.sort(function(a, b) {
      var textA = a.title.toUpperCase()
      var textB = b.title.toUpperCase()
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

  handleSelectService(event){
    return this.props.history.push("/services/" + event.currentTarget.id)
  }
  newService(){
    return this.props.history.push("services/new")
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
       if (iterator[0] === "sdl" || iterator[0] === "service_owner") {
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
    return this.state.data.filter( s =>
      (s.title ? s.title.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      ( s.description ? s.description.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      ( s.division ?  s.division.toLowerCase().includes(this.state.search.toLowerCase()) : false ) ||
      ( s.sdl ? s.sdl.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      ( s.service_owner ? s.service_owner.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false)
    )
  }

  render(){
    const filteredList = this.filterData()
    return(
      !this.state.data[0] ? <Loader active inline='centered' content='Loading'/> :
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column width={2} floated='left' >
            <Button type='button' onClick={this.newService.bind(this)}>Add Services</Button>
          </Grid.Column>
          <Grid.Column floated='left' stretched width={10}>
            <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <ServicesTable
              sortedAndFilteredList={filteredList}
              handleSelectService={this.handleSelectService.bind(this)}
              handleSort={this.handleSort.bind(this)}
              column={this.state.column}
              direction={this.state.direction}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
