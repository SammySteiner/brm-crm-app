import React,{ Component } from 'react'
import { getDetails, deleteResource } from '../../api'
import { List, Button, Card, Loader, Container, Header, Grid, Divider} from 'semantic-ui-react'

export default class ConnectionsDetail extends Component {
  constructor(props){
    super()
    this.state = {
      connection: {}
    }
  }

  componentDidMount(){
    getDetails('connections', this.props.match.params.id)
    .then(connection => {
      if (connection.error) {
        console.log(connection.error)
        alert('You must be logged in to access this page.')
        return this.props.history.push('/login')
      } else {
        return this.setState({connection: connection})
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
  handleSelectEngagement(event){
    return this.props.history.push("/engagements/" + event.currentTarget.id)
  }

  handleDelete(event){
    deleteResource('connections', this.state.connection.id)
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

  handleNewEngagement(){
    this.props.history.push('/engagements/new', {connections: this.state.connection.title})
  }


  available(field){
    return field === null ? 'Data Not Available' : field
  }

  handleEdit(event){
    event.preventDefault()
    this.props.history.push({
      pathname: this.state.connection.id + "/edit",
      state: this.state.connection
    })
  }

  generateEngagementCards(){
    return this.state.connection.engagements.map( (e, i) => {
      return(
        <Grid.Column key={i}>
        <Card fluid id={e.id} onClick={this.handleSelectEngagement.bind(this)} as='div'>
          <Card.Content header={`Engagement: ${i + 1}`}/>
          <Card.Content>
            <List>
              <List.Item>Title: {e.title}</List.Item>
              {e.ksr ? <List.Item>KSR: {e.ksr}</List.Item> : null}
              {e.inc ? <List.Item>INC: {e.inc}</List.Item> : null}
              {e.prj ? <List.Item>PRJ: {e.prj}</List.Item> : null}
              <List.Item>Service: {e.service.title}</List.Item>
              <List.Item>Priority: {e.priority}</List.Item>
              <List.Item>Notes: {e.notes}</List.Item>
              {e.report ? <List.Item>Report: {e.report}</List.Item> : null}
            </List>
          </Card.Content>
          <Card.Content>
            <Card.Header>People:</Card.Header>
            <List ordered>
              {e.staff_engagements.map( e => {
                return(
                  <List.Item key={e.id}>{e.fullname}</List.Item>
                )
              })}
            </List>
          </Card.Content>
          <Card.Content extra>
            <List>
              <List.Item >Created By: {e.created_by.fullname}</List.Item>
              <List.Item >Last Modified By: {e.last_modified_by.fullname}</List.Item>
            </List>
          </Card.Content>
        </Card>
      </Grid.Column>

      )
    })
  }

  attendees(){
    return this.state.connection.staff_connections.map( sc => {
      return <List.Item key={sc.id} id={sc.id} onClick={this.handleSelectStaff.bind(this)}>{sc.fullname}</List.Item>
    })
  }

  render(){
    return(
      !this.state.connection.id ? <Loader active inline='centered' content='Loading'/> :
      <Container>
        <Header as='h1' textAlign='center'>Connection with {this.state.connection.agency.acronym}</Header>
        <Grid stackable>
          <Grid.Row columns={4}>
            <Grid.Column >
              <Card fluid>
                <Card.Content header="Basic Info"/>
                <Card.Content>
                  <List>
                    <List.Item icon='calendar' content={`Date: ${new Date(this.state.connection.date).toDateString()}`}/>
                    <List.Item icon='time' content={`Time: ${new Date(this.state.connection.date).toLocaleTimeString()}`}/>
                    <List.Item icon='user' onClick={this.handleSelectStaff.bind(this)} id={this.state.connection.arm.id} content={`ARM: ${this.state.connection.arm.fullname}`} />
                    <List.Item icon='building' onClick={this.handleSelectAgency.bind(this)} id={this.state.connection.agency.id} content={`Agency: ${this.state.connection.agency.acronym}`} />
                    <List.Item icon='conversation' content={`Type: ${this.state.connection.connection_type.via}`} />

                    {/* date and time, Agency, ARM, Other Staff, Type, Report Notes, Number of Engagements, List of services involved, All relevant Doitt folk, Engagments each as a seperate card*/}
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid>
                <Card.Content header="Report"/>
                <Card.Content>{this.state.connection.report}</Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid>
                <Card.Content header="Notes"/>
                <Card.Content>{this.state.connection.notes}</Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid>
                <Card.Content header="Attendees"/>
                <Card.Content>
                  <List>
                    {this.attendees()}
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3} >
            {this.generateEngagementCards()}
          </Grid.Row>
          <Divider/>
          <Grid.Row columns={1}>
            <Grid.Column >
              <Button negative  size='mini' onClick={this.handleDelete.bind(this)}>Delete</Button>
              <Button primary floated="right" size='medium' onClick={this.handleNewEngagement.bind(this)}>New Engagement</Button>
              <Button secondary size='mini' onClick={this.handleEdit.bind(this)}>Edit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
