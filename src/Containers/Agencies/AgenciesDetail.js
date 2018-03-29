import React,{ Component } from 'react'
import { getDetails, deleteResource } from '../../api'
import { List, Button, Card, Loader, Container, Header, Grid, Divider} from 'semantic-ui-react'
import ConnectionsSimpleTable from '../Connections/ConnectionsSimpleTable.js'
import EngagementsSimpleTable from '../Engagements/EngagementsSimpleTable.js'

export default class AgencyDetail extends Component {
  constructor(props){
    super()
    this.state = {
      agency: {}
    }
  }

  componentDidMount(){
    getDetails('agencies', this.props.match.params.id)
    .then(agency => {
      if (agency.error) {
        console.log(agency.error)
        alert('You must be logged in to access this page.')
        return this.props.history.push('/login')
      } else {
        return this.setState({agency: agency})
      }
    })
  }

  handleSelectStaff(type){
    if (this.state.agency[type]) {
      return this.props.history.push("/staff/" + this.state.agency[type].id)
    }
  }

  handleDelete(event){
    deleteResource('agencies', this.state.agency.id)
    .then( staff => {
      if (staff[0] !== undefined) {
        var alertIntro = `${staff[0].agency.name} has successfully been deleted from the database. The staff of the agency have not been deleted, including: `
        var alertStaff = []
        for (var i = 0; i < staff.length; i++) {
          alertStaff.push(staff[i].fullname)
        }
        var alertMessage = alertIntro + alertStaff.join(', ') + '.'
        alert(alertMessage)
      } else {
        alert(`${this.state.agency.name} has successfully been deleted from the database. This agency had no staff in the Database.`)
      }
    })
    .then( () => this.props.history.goBack())
  }


  available(field){
    return field === null ? 'Data Not Available' : field
  }

  handleEdit(event){
    event.preventDefault()
    this.props.history.push({
      pathname: this.state.agency.id + "/edit",
      state: this.state.agency
    })
  }

  render(){
    return(
      !this.state.agency.id ? <Loader active inline='centered' content='Loading'/> :
      <Container>
        <Header as='h1' textAlign='center'>{this.state.agency.name} ({this.state.agency.acronym})</Header>
        <Grid columns={2}>
          <Grid.Row >
            <Grid.Column >
              <Card fluid>
                <Card.Content header="Basic Info"/>
                <Card.Content>
                  <List>
                    <List.Item icon='' content={`Address: ${this.available(this.state.agency.address)}`} />
                    <List.Item icon='' onClick={()=>this.handleSelectStaff('commissioner')} content={`Commissioner: ${this.state.agency.commissioner ? this.state.agency.commissioner.first_name + " " + this.state.agency.commissioner.last_name : 'Data Not Available'}`} />
                    <List.Item icon='' onClick={()=>this.handleSelectStaff('cio')} content={`CIO: ${this.state.agency.cio ? this.state.agency.cio.first_name + " " + this.state.agency.cio.last_name : 'Data Not Available'}`} />
                    <List.Item icon='' onClick={()=>this.handleSelectStaff('arm')} content={`ARM: ${this.state.agency.arm ? this.state.agency.arm.first_name + " " + this.state.agency.arm.last_name : 'Data Not Available'}`} />
                    <List.Item icon='' content={`Category: ${this.available(this.state.agency.category)}`} />
                    <List.Item icon='' content={`CityNet Access: ${this.state.agency.citynet ? "Yes" : "No"}`} />
                    <List.Item icon='' content={`Mayoral: ${this.state.agency.mayoral ? "Yes" : "No"}`} />
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
              <ConnectionsSimpleTable history={this.props.history} table={'agencies'} attribute={'acronym'} value={this.state.agency.acronym}/>
            </Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row columns={1}>
            <Grid.Column>
              <EngagementsSimpleTable history={this.props.history} table={'agencies'} attribute={'acronym'} value={this.state.agency.acronym}/>
            </Grid.Column>
          </Grid.Row>
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
