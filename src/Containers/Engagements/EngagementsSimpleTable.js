import React, { Component } from 'react'

import EngagementsTable from './EngagementsTable'
import { getDirectory } from '../../api'
import { Grid, Loader, Header } from 'semantic-ui-react'

export default class Engagements extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      loading: true,
      column: 'date',
      direction: 'ascending',
      search: '',
      status: true,
      filters: {
        priority: '',
        arm: '',
        type: '',
        agency: ''
      }
    }
  }

  componentDidMount() {
    getDirectory('engagements', this.props.table, this.props.attribute, this.props.value)
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
    .then(data => this.setState({ loading: false, data }))
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
    const filteredList = this.state.data.filter(
      d =>
      (this.state.filters.priority ? d.priority === this.state.filters.priority : true) &&
      (this.state.filters.arm ? d.arm.fullname === this.state.filters.arm : true) &&
      (this.state.filters.type ? d.type === this.state.filters.type : true) &&
      (this.state.status ? !d.resolved_on : true)

    )
    const sortedList = filteredList.filter( d =>
      (d.arm.fullname ? d.arm.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (d.agency.acronym ? d.agency.acronym.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (d.agency.name ? d.agency.name.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (d.type ? d.type.toLowerCase().includes(this.state.search.toLowerCase()) : false) ||
      (d.date ? new Date(d.date).toDateString().toLowerCase().includes(this.state.search.toLowerCase()): false)
    )
    return(
      this.state.loading ? <Loader active inline='centered' content='Loading'/>
      : !this.state.data[0] ? <Header as='h4'>No Engagements</Header> :
        <Grid padded>
          <Grid.Row >
            <Grid.Column >
              <Header as='h2'>Engagements</Header>
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
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}
