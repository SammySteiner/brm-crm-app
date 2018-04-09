import React from 'react'
import { Container, Form, Button, Dropdown } from 'semantic-ui-react'

export default (props) => {
  var d = new Date(props.datetime)
  var ten = function(i){
    return (i < 10 ? '0' : '') + i
  }
  var datetime = `${d.getFullYear()}-${ten(d.getMonth()+1)}-${ten(d.getDate())}T${ten(d.getHours())}:${ten(d.getMinutes())}`
  var types = [{key: '', value: '', text: ''}]
  props.types.sort().forEach( (t, i) => types.push({ key: i, value: t, text: t }))
  var arms = [{key: '', value: '', text: ''}]
  props.arms.sort().forEach( (a, i) => arms.push({ key: i, value: a, text: a }))
  var agencies = [{key: '', value: '', text: ''}]
  props.agencies.sort((a,b) => a.name > b.name ? 1 : -1).forEach( (a, i) => agencies.push({ key: i, value: a.name, text: a.name }))
  var staff = [{key: '', value: '', text: ''}]
  props.staff.sort( (a,b) => a.fullname > b.fullname ? 1 : -1 ).forEach( s => staff.push({ key: s.id, value: s.fullname, text: s.fullname }))
  var unresolved_engagements = [{key: '', value: '', text: ''}]
  if (!!props.agency) {
    var acronym = props.agencies.find( a => a.name === props.agency).acronym ? props.agencies.find( a => a.name === props.agency).acronym : ''
    props.unresolved_engagements.filter( pue => pue.title.toLowerCase().includes(acronym.toLowerCase())).forEach( pue => unresolved_engagements.push({ key: pue.id, value: pue.title, text: pue.title }))
  }

  return(
    <Container textAlign='left'>
        <Form onSubmit={props.handleSubmit} >
          <Form.Input label="Connection Date and Time: " type='datetime-local' value={datetime} onChange={props.handleInputChange} id='datetime'/>
          <Form.Field >
            <label>Type:</label>
            <Dropdown fluid search selection placeholder='Search...' id='type' value={props.type} onChange={props.handleInputChange} options={types} />
          </Form.Field>
          <Form.Field >
            <label>ARM:</label>
            <Dropdown fluid search selection placeholder='Search...' id='arm' value={props.arm} onChange={props.handleInputChange} options={arms} />
          </Form.Field>
          <Form.Field >
            <label>Agency:</label>
            <Dropdown fluid search selection placeholder='Search...' id='agency' value={props.agency} onChange={props.handleInputChange} options={agencies} />
          </Form.Field>
          <Form.Field >
            <label>Attendees:</label>
            <Dropdown fluid search selection multiple placeholder='Search...' id='attendees' value={props.attendees} onChange={props.handleInputChange} options={staff} />
          </Form.Field>
          <Form.Field disabled={!props.agency}>
            <label>Engagements:</label>
            <Dropdown fluid search selection multiple placeholder='Search...' id='engagements' value={props.engagements} onChange={props.handleInputChange} options={unresolved_engagements} />
          </Form.Field>
          <Form.TextArea label="Connection Notes: " type='textArea' value={props.notes} onChange={props.handleInputChange} id='notes'/>
          <Form.TextArea label="Connection Report: " type='textArea' value={props.report} onChange={props.handleInputChange} id='report'/>
          <Button type='submit' onClick={props.handleSubmit}>Submit</Button>
      </Form>
    </Container>
  )
}
