import React,{ Component } from 'react'
import { getDetails, deleteResource, editResource } from '../../api'
import { List, Button, Card, Loader, Container, Header, Grid, Divider } from 'semantic-ui-react'
import '../../Black.css'

export default class EngagementsDetail extends Component {
  constructor(props){
    super()
    this.state = {
      engagement: {}
    }
  }

  componentDidMount(){
    getDetails('engagements', this.props.match.params.id)
    .then(engagement => {
      if (engagement.error) {
        console.log(engagement.error)
        if (engagement.error === "Page no longer exits.") {
          return this.props.history.push('/connections')
        }
        alert('You must be logged in to access this page.')
        return this.props.history.push('/login')
      } else {
        return this.setState({engagement: engagement})
      }
    })
  }

  handleSelectStaff(event){
    return this.props.history.push("/staff/" + event.currentTarget.id)
  }
  handleSelectAgency(event){
    return this.props.history.push("/agencies/" + event.currentTarget.id)
  }
  handleSelectService(event){
    return this.props.history.push("/services/" + event.currentTarget.id)
  }
  handleSelectConnection(event){
    return this.props.history.push("/connections/" + event.currentTarget.id)
  }

  handleDelete(event){
    deleteResource('engagements', this.state.engagement.id)
    // .then( staff => {
    //   if (staff[0] !== undefined) {
    //     var alertIntro = `${staff[0].agency.name} has successfully been deleted from the database. The staff of the agency have not been deleted, including: `
    //     var alertStaff = []
    //     for (var i = 0; i < staff.length; i++) {
    //       alertStaff.push(staff[i].fullname)
    //     }
    //     var alertMessage = alertIntro + alertStaff.join(', ') + '.'
    //     alert(alertMessage)
    //   } else {
    //     alert(`${this.state.agency.name} has successfully been deleted from the database. This agency had no staff in the Database.`)
    //   }
    // })
    .then( () => this.props.history.goBack())
  }

  handleNewConnection(){
    this.props.history.push('/connections/new', {
      engagements: this.state.engagement.title,
      agency: this.state.engagement.connections[0].agency.name
    })
  }


  available(field){
    return field === null ? 'Data Not Available' : field
  }

  handleEdit(event){
    event.preventDefault()
    this.props.history.push({
      pathname: this.state.engagement.id + "/edit",
      state: this.state.engagement
    })
  }

  handleResolve(){
    var s = this.state.engagement
    let connections = s.connections.map( c => c.id)
    let team = s.staff_engagements.map( se => se.staff.id)
    let info = {id: s.id, title: s.title, report: s.report, notes: s.notes, type: s.engagement_type.via, ksr: s.ksr, inc: s.inc, prj: s.prj, priority: s.priority, service: s.service.title, start_time: s.start_time, resolved_on: new Date(), connections: connections, team: team}
    editResource(info, 'engagement', 'engagements')
    .then( engagement => this.componentDidMount())
  }

  generateConnectionCards(){
    return this.state.engagement.connections.map( (c, i) => {
      return(
        <Grid.Column key={i}>
        <Card fluid id={c.id} onClick={this.handleSelectConnection.bind(this)} className="black">
          <Card.Content header={`Connection: ${i + 1}`}/>
          <Card.Content>
            <List>
              <List.Item icon='calendar' content={`Date: ${new Date(c.date).toDateString()}`}/>
              <List.Item icon='time' content={`Time: ${new Date(c.date).toLocaleTimeString()}`}/>
              <List.Item icon='building' onClick={this.handleSelectAgency.bind(this)} id={c.agency.id} content={`Agency: ${c.agency.name}`} />
              <List.Item icon='conversation' content={`Type: ${c.connection_type.via}`} />
            </List>
          </Card.Content>
          <Card.Content>
            <Card.Header>Attendees:</Card.Header>
            <List ordered>
              {c.staff.map( s => {
                return(
                  <List.Item key={s.id}>{s.fullname}</List.Item>
                )
              })}
            </List>
          </Card.Content>
        </Card>
      </Grid.Column>
      )
    })
  }

  generateService(){
    return (
      <List>
        <List.Item icon='' content={`Title: ${this.state.engagement.service.title}`} />
        <List.Item icon='' content={`Description: ${this.state.engagement.service.description}`} />
        <List.Item icon='' content={`SLA: ${this.state.engagement.service.sla ? this.state.engagement.service.sla : 'Data Not Available'}`} />
        <List.Item icon='' onClick={this.handleSelectStaff.bind(this)} id={this.state.engagement.service.sdl ? this.state.engagement.service.sdl.id : null} content={`SDL: ${this.state.engagement.service.sdl ? this.state.engagement.service.sdl.fullname : 'Data Not Available'}`} />
        <List.Item icon='' onClick={this.handleSelectStaff.bind(this)} id={this.state.engagement.service.service_owner ? this.state.engagement.service.service_owner.id : null} content={`Service Owner: ${this.state.engagement.service.service_owner ? this.state.engagement.service.service_owner.fullname : 'Data Not Available'}`} />
        <List.Item icon='' content={`Division: ${this.state.engagement.service.division.name}`} />

      </List>
    )
  }

  team(){
    return this.state.engagement.staff_engagements.map( se => {
      return <List.Item key={se.id} id={se.staff.id} onClick={this.handleSelectStaff.bind(this)}>{se.staff.fullname}</List.Item>
    })
  }

  render(){
    return(
      !this.state.engagement.id ? <Loader active inline='centered' content='Loading'/> :
      <Container>
        <Header as='h1' textAlign='center'>{this.state.engagement.title}</Header>
        <Grid columns={4} stackable >
          <Grid.Row >
            <Grid.Column >
              <Card fluid>
                <Card.Content header="Basic Info"/>
                <Card.Content>
                  <List>
                    <List.Item icon='calendar' content={`Date: ${new Date(this.state.engagement.start_time).toDateString()}`}/>
                    <List.Item icon='time' content={`Start Time: ${new Date(this.state.engagement.start_time).toLocaleTimeString()}`}/>
                    <List.Item icon='user' onClick={this.handleSelectStaff.bind(this)} id={this.state.engagement.connections[0].arm.id} content={`ARM: ${this.state.engagement.connections[0].arm.fullname}`} />
                    <List.Item icon='building' onClick={this.handleSelectAgency.bind(this)} id={this.state.engagement.connections[0].agency.id} content={`Agency: ${this.state.engagement.connections[0].agency.acronym}`} />
                    <List.Item icon='conversation' content={`Type: ${this.state.engagement.engagement_type.via}`} />
                    {this.state.engagement.ksr ? <List.Item >KSR: {this.state.engagement.ksr}</List.Item> : null}
                    {this.state.engagement.inc ? <List.Item >INC: {this.state.engagement.inc}</List.Item> : null}
                    {this.state.engagement.prj ? <List.Item >PRJ: {this.state.engagement.prj}</List.Item> : null}
                    {this.state.engagement.priority ? <List.Item >Priority: {this.state.engagement.priority}</List.Item> : null}
                  </List>
                </Card.Content>
                <Card.Content>
                  <Header as="h4" content="Team:"/>
                  <List ordered>
                    {this.team()}
                  </List>
                </Card.Content>
                <Card.Content extra>
                  <List>
                    <List.Item id={this.state.engagement.created_by.id} onClick={this.handleSelectStaff.bind(this)}>Created By: {this.state.engagement.created_by.fullname}</List.Item>
                    <List.Item id={this.state.engagement.last_modified_by.id} onClick={this.handleSelectStaff.bind(this)}>Last Modified By: {this.state.engagement.last_modified_by.fullname}</List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid>
                <Card.Content header="Report"/>
                <Card.Content>{this.state.engagement.report}</Card.Content>
                <Card.Content extra>
                  Status: {this.state.engagement.resolved_on ? 'Resolved' : 'In Progress'}
                  <br/>
                  {this.state.engagement.resolved_on ? `Resolved on: ${new Date(this.state.engagement.resolved_on).toLocaleDateString()}` : null}
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid>
                <Card.Content header="Notes"/>
                <Card.Content>{this.state.engagement.notes}</Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid id={this.state.engagement.service.id} onClick={this.handleSelectService.bind(this)} className='black'>
                <Card.Content header="Service"/>
                <Card.Content>
                  {this.generateService()}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row columns={3} >
            {this.generateConnectionCards()}
          </Grid.Row>
          <Divider/>
          <Grid.Row columns={1}>
            <Grid.Column >
              <Button negative size='mini' onClick={this.handleDelete.bind(this)}>Delete</Button>
              <Button secondary size='mini' onClick={this.handleEdit.bind(this)}>Edit</Button>
              <Button secondary size='mini' onClick={this.handleNewConnection.bind(this)}>New Connection</Button>
              {this.state.engagement.resolved_on ? null : <Button primary size='medium' floated="right" onClick={this.handleResolve.bind(this)}>Resolve Now</Button>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
