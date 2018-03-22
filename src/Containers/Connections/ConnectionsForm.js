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
  props.agencies.sort().forEach( (a, i) => agencies.push({ key: i, value: a, text: a }))
  var staff = [{key: '', value: '', text: ''}]
  props.staff.sort().forEach( (a, i) => staff.push({ key: i, value: a, text: a }))
  return(
    <Container textAlign='left'>
        <Form onSubmit={props.handleSubmit} >
          <Form.Input label="Connection Date and Time: " type='datetime-local' value={datetime} onChange={props.handleInputChange} id='datetime'/>
          <Form.TextArea label="Connection Report: " type='textArea' value={props.report} onChange={props.handleInputChange} id='report'/>
          <Form.TextArea label="Connection Notes: " type='textArea' value={props.notes} onChange={props.handleInputChange} id='notes'/>
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
          <Button type='submit' onClick={props.handleSubmit}>Submit</Button>
      </Form>
    </Container>
  )
}
