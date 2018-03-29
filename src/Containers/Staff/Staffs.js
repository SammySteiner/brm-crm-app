import React, { Component } from 'react'
import StaffTable from './StaffTable'
import Search from '../Search.js'
import { getDirectory } from '../../api'
import { Button, Grid, Loader } from 'semantic-ui-react'


export default class Staffs extends Component {
  constructor(){
    super()
    this.state = {
      data: [],
      column: 'name',
      direction: 'ascending',
      search: ''
    }
  }

  componentDidMount(){
    getDirectory('staff')
    .then( data => data.sort(function(a, b) {
      var textA = a.last_name.toUpperCase()
      var textB = b.last_name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0})
    )
    .then( data => this.setState({ data }))
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSelectStaff(event){
    return this.props.history.push("/staff/" + event.currentTarget.id)
  }
  newStaff(){
    return this.props.history.push("staff/new")
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
       if (iterator[0] === "name") {
        return collection.sort(function(x, y) {
          return (x.last_name === null) ? 1 : (y.last_name === null) ? -1 : x.last_name > y.last_name ? 1 : -1
        })
      } else if (iterator[0] === "agency") {
        return collection.sort(function(x, y) {
          return (x[iterator] === null) ? 1 : (y[iterator] === null) ? -1 : x[iterator].name > y[iterator].name ? 1 : -1
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
      (s.fullname ? s.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (s.role ? s.role.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (s.agency ? s.agency.name.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (s.office_phone ? s.office_phone.includes(this.state.search) : false)
    )
  }

  render(){
    const filteredList = this.filterData()
    return(
      !this.state.data[0] ? <Loader active inline='centered' content='Loading'/>  :
          <Grid padded>
            <Grid.Row columns={2}>
              <Grid.Column width={2} floated='left' >
                <Button type='button' onClick={this.newStaff.bind(this)}>Add Staff Members</Button>
              </Grid.Column>
              <Grid.Column floated='left' stretched width={10}>
                <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <StaffTable
                  sortedAndFilteredList={filteredList}
                  handleSort={this.handleSort.bind(this)}
                  handleSelectStaff={this.handleSelectStaff.bind(this)}
                  column={this.state.column}
                  direction={this.state.direction}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
    )
  }

}
