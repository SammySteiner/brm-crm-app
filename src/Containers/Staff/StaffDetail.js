import React,{ Component } from 'react'
import { getDetails, deleteResource } from '../../api'
import { List, Button, Card, Loader, Container, Header, Grid } from 'semantic-ui-react'

export default class StaffDetail extends Component {
  constructor(props){
    super()
    this.state = {
      staff: {}
    }
  }

  componentDidMount(){
    getDetails('staff', this.props.match.params.id)
    .catch(error => {
    })
    .then(staff => { if (staff.error) {
      console.log(staff.error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    } else {
      return this.setState({staff: staff})
    }
  })
  }

  handleSelectAgency(event){
    return event.target.parentElement.id ? this.props.history.push("/agencies/" + event.target.parentElement.id) : this.props.history.push("/agencies/" + event.target.id)
  }
  handleSelectService(event){
    return this.props.history.push("/services/" + event.target.id)
  }

  assignments(){
    if (this.state.staff.role.title === "ARM") {
      return (
        <Card fluid>
          <Card.Content header='Agency Assignments'/>
          <Card.Content>
            <List ordered>
              {this.state.staff.assignments.map(a => <List.Item key={a.id} id={a.id} onClick={this.handleSelectAgency.bind(this)}>{a.name}</List.Item>)}
            </List>
          </Card.Content>
        </Card>
      )
    } else {
      return ""
    }
  }

  services(){
    if (this.state.staff.role.title === "SDL" || this.state.staff.role.title === "Service Provider" || this.state.staff.role.title === "Service Owner") {
      return (
        <Card fluid>
          <Card.Content header='Services'/>
          <Card.Content>
            <List ordered>
              {this.state.staff.sdl_services[0] ? <Header as='h4'>SDL</Header> : null}
              {this.state.staff.sdl_services[0] ? this.state.staff.sdl_services.map(s => <List.Item key={s.id} id={s.id} onClick={this.handleSelectService.bind(this)}>{s.title}</List.Item>) : null}
              {this.state.staff.so_services[0] ? <Header as='h4'>SO</Header> : null}
              {this.state.staff.so_services[0] ? this.state.staff.so_services.map(s => <List.Item key={s.id} id={s.id} onClick={this.handleSelectService.bind(this)}>{s.title}</List.Item>) : null}
              {this.state.staff.dc_services[0] ? <Header as='h4'>DC</Header> : null}
              {this.state.staff.dc_services[0] ? this.state.staff.dc_services.map(s => <List.Item key={s.id} id={s.id} onClick={this.handleSelectService.bind(this)}>{s.title}</List.Item>) : null}
            </List>
          </Card.Content>
        </Card>
      )
    } else {
      return ""
    }

  }

  handleEdit(event){
    event.preventDefault()
    this.props.history.push({
      pathname: this.state.staff.id + "/edit",
      state: this.state.staff
    })
  }

  handleDelete(event){
    deleteResource('staff', this.state.staff.id)
    .then( staff => alert(`${staff.fullname}, the ${staff.role.title} of ${staff.agency.name} has successfully been deleted from the databse`))
    .then( () => this.props.history.goBack())
  }

  render(){
    console.log(this.state);
    return(
      !this.state.staff.id ? <Loader active inline='centered' content='Loading'/> :
      <Container>
        <Header as='h1' textAlign='center'>{this.state.staff.fullname}</Header>
        <Grid columns={2}>
          <Grid.Row >
            <Grid.Column >
              <Card fluid>
                <Card.Content header="Basic Info"/>
                <Card.Content>
                  <List id={this.state.staff.agency.id}>
                    <List.Item icon='building outline' id={this.state.staff.agency.id.toString()} onClick={this.handleSelectAgency.bind(this)} content={this.state.staff.agency.name} />
                    <List.Item icon='mail' content={this.state.staff.email} />
                    <List.Item icon='phone' content={this.state.staff.office_phone} />
                    <List.Item icon='mobile' content={this.state.staff.cell_phone} />
                    <List.Item icon='id card' content={this.state.staff.role.title} />
                  </List>
                </Card.Content>
                <Card.Content extra>
                  <Button size='mini' onClick={this.handleDelete.bind(this)}>Delete</Button>
                  <Button floated='right' size='mini' onClick={this.handleEdit.bind(this)}>Edit</Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              {this.assignments()}
              {this.services()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
