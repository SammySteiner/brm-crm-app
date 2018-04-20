import React,{ Component } from 'react'
import { getDetails, deleteResource } from '../../api'
import { List, Button, Card, Loader, Container, Header, Grid, Divider, Progress } from 'semantic-ui-react'
import EngagementsSimpleTable from '../Engagements/EngagementsSimpleTable.js'
import '../../Black.css'


export default class ServiceDetail extends Component {
  constructor(props){
    super()
    this.state = {
      service: {}
    }
  }

  componentDidMount(){
    getDetails('services', this.props.match.params.id)
    .then(service =>
      {if (service.error) {
        console.log(service.error)
        alert('You must be logged in to access this page.')
        return this.props.history.push('/login')
      } else {
        return this.setState({service: service})
      }}
      )
  }

  handleSelectStaff(type){
    if (this.state.service[type]) {
      return this.props.history.push("/staff/" + this.state.service[type].id)
    }
  }


  handleDelete(event){
    deleteResource('services', this.state.service.id)
    .then( service => alert(`${service.title}, lead by ${service.sdl.fullname}, has successfully been deleted from the databse`))
    .then( () => this.props.history.goBack())
  }

  handleEdit(event){
    event.preventDefault()
    this.props.history.push({
      pathname: this.state.service.id + "/edit",
      state: this.state.service
    })
  }

  agencyUtilization(){
    var agencies = this.state.service.agencies.sort( (a,b) => a.name > b.name ? 1 : -1).map( a => <List.Item  id={a.id} onClick={this.handleSelectAgency.bind(this)} key={a.id}>{a.name}</List.Item>)
    var agenciesFirst = agencies.slice(0, (agencies.length/2))
    var agenciesSecond = agencies.slice((agencies.length/2), agencies.length)

    return(
      <Grid.Row columns={2}>
        <Grid.Column>
            <List animated>
              {agenciesFirst}
            </List>
        </Grid.Column>
        <Grid.Column>
            <List animated>
              {agenciesSecond}
            </List>
        </Grid.Column>
      </Grid.Row>
    )
  }

  totalUtilization(){
    return this.state.service.total_agencies
  }
  handleSelectAgency(event){
    return this.props.history.push("/agencies/" + event.currentTarget.id)
  }


  render(){
    return(
      !this.state.service.id ? <Loader active inline='centered' content='Loading'/> :
      <Container>
        <Header as='h1' textAlign='center'>{this.state.service.title}</Header>
        <Grid columns={2}>
          <Grid.Row >
            <Grid.Column >
              <Card fluid>
                <Card.Content header="Basic Info"/>
                <Card.Content>
                  <List>
                    <List.Item icon='' content={`Description: ${this.state.service.description}`} />
                    <List.Item icon='' content={`SLA: ${this.state.service.sla}`} />
                    <List.Item icon='' onClick={()=>this.handleSelectStaff('sdl')} content={`SDL: ${this.state.service.sdl ? this.state.service.sdl.first_name + ' ' + this.state.service.sdl.last_name : 'Data Not Available'}`} />
                    <List.Item icon='' onClick={()=>this.handleSelectStaff('service_owner')} content={`Service Owner: ${this.state.service.service_owner ? this.state.service.service_owner.first_name + ' ' + this.state.service.service_owner.last_name : 'Data Not Available'}`} />
                    <List.Item icon='' content={`Division: ${this.state.service.division.name}`} />
                    <List.Item icon='' onClick={()=>this.handleSelectStaff('deputy_commissioner')} content={`Deputy Commissioner: ${this.state.service.deputy_commissioner ? this.state.service.deputy_commissioner.first_name + ' ' + this.state.service.deputy_commissioner.last_name : 'Data Not Available'}`} />
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row columns={1}>
            <Grid.Column>
              <EngagementsSimpleTable history={this.props.history} table={'services'} attribute={'title'} value={this.state.service.title}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as='h2'>Utilization by Agencies</Header>
              <Progress color='blue' value={this.state.service.agencies.length} total={this.totalUtilization()} progress='ratio'/>
            </Grid.Column>
          </Grid.Row>
          {this.agencyUtilization()}
          <Divider/>
          <Grid.Row columns={1}>
            <Grid.Column >
              <Button negative size='mini' onClick={this.handleDelete.bind(this)}>Delete</Button>
              <Button secondary size='mini' onClick={this.handleEdit.bind(this)}>Edit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
