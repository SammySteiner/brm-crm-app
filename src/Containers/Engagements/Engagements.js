import React, { Component } from 'react'

import EngagementsTable from './EngagementsTable'
import Search from '../Search.js'

import { getDirectory } from '../../api'
import { Button, Grid, Loader } from 'semantic-ui-react'

export default class Engagements extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      column: 'date',
      direction: 'ascending',
      search: '',
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

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSelectEngagement(event){
    return this.props.history.push("/engagements/" + event.currentTarget.id)
  }
  newEngagement(){
    return this.props.history.push("engagements/new")
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


  render(){
    const filteredList = this.state.data.filter( d =>
      (d.arm.fullname ? d.arm.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (d.agency.acronym ? d.agency.acronym.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (d.agency.name ? d.agency.name.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (d.type ? d.type.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (d.date ? new Date(d.date).toDateString().toLowerCase().includes(this.state.search.toLowerCase()): false)
    )
    return(
      !this.state.data[0] ? <Loader active inline='centered' content='Loading'/> :
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column width={2} floated='left' >
              <Button type='button' onClick={this.newEngagement.bind(this)}>New Engagement</Button>
            </Grid.Column>
            <Grid.Column  floated='left' stretched width={10}>
                <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column >
              <EngagementsTable
                sortedAndFilteredList={filteredList}
                handleSelectEngagement={this.handleSelectEngagement.bind(this)}
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
