import React, { Component } from 'react'
import EngagementsTable from './EngagementsTable'
import Search from '../Search.js'
import { getDirectory } from '../../api'
import { Button, Grid, Loader, Checkbox } from 'semantic-ui-react'

export default class Engagements extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      column: 'date',
      direction: 'ascending',
      search: '',
      status: true,
      filters: {
        priority: '',
        arm: '',
        type: '',
        agency: '',
        connections: ''
      }
    }
  }

  componentDidMount() {
    getDirectory('engagements')
    .then( data => data.sort(function(a, b) {
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

  handleInputChange(event, data){
    let value = data.type === 'checkbox' ? data.checked : data.value
    this.setState({
      [data.id]: value
    })
  }

  handleFilter(event, data){
    var filters = {...this.state.filters}
    var value = data.content === 'All' ? '' : data.content
    filters[data.id] = value
    this.setState({filters})
  }

  handleSelectEngagement(event){
    return this.props.history.push("/engagements/" + event.currentTarget.id)
  }
  newEngagement(){
    return this.props.history.push("engagements/new")
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: this.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })
      return
    }
    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
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

filterData(){
  // remove values from the data for presentation that do not match the filters
  return this.state.data.filter(
    d =>
    (this.state.filters.priority ? d.priority === this.state.filters.priority : true) &&
    (this.state.filters.arm ? d.arm.fullname === this.state.filters.arm : true) &&
    (this.state.filters.type ? d.type === this.state.filters.type : true) &&
    (this.state.status ? !d.resolved_on : true)
  )
}

sortData(filteredList){
  // remove values from the data for presentation that do not match the search query
  return filteredList.filter( d =>
    (d.arm.fullname ? d.arm.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (d.agency.acronym ? d.agency.acronym.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (d.agency.name ? d.agency.name.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (d.type ? d.type.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
    (d.date ? new Date(d.date).toDateString().toLowerCase().includes(this.state.search.toLowerCase()): false)
  )
}


  render(){
    const filteredList = this.filterData()
    const sortedList = this.sortData(filteredList)
    return(
      !this.state.data[0] ? <Loader active inline='centered' content='Loading'/> :
        <Grid padded>
          <Grid.Row columns={3}>
            <Grid.Column width={2} floated='left' >
              <Button type='button' onClick={this.newEngagement.bind(this)}>New Engagement</Button>
            </Grid.Column>
            <Grid.Column stretched floated='left' width={10}>
                <Search search={this.state.search} handleChange={this.handleInputChange.bind(this)}/>
            </Grid.Column>
            <Grid.Column width={2}>
              <Checkbox id='status' label="Active Only" type='checkbox' checked={this.state.status} onChange={this.handleInputChange.bind(this)} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column >
              <EngagementsTable
                sortedAndFilteredList={sortedList}
                handleSelectEngagement={this.handleSelectEngagement.bind(this)}
                handleSort={this.handleSort.bind(this)}
                direction={this.state.direction}
                column={this.state.column}
                filters={this.state.filters}
                handleFilter={this.handleFilter.bind(this)}
                types={['All', ...new Set(this.state.data.map(item => item.type))]}
                arms={['All', ...new Set(this.state.data.map(item => item.arm.fullname))]}
                connections={['All', ...new Set(this.state.data.map(item => item.connections))]}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}
