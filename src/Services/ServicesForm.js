import React from 'react'
import { Dropdown, Form, Button, Container } from 'semantic-ui-react'


export default (props) => {
  var staff = [{key: '', value: '', text: ''}]
  props.staffNames.sort().forEach( (s, i) => staff.push({ key: i, value: s, text: s }))
  var agencies = [{key: '', value: '', text: ''}]
  var divisions = [{key: '', value: '', text: ''}]
  props.divisionNames.forEach( (d, i) => divisions.push({ key: i, value: d, text: d }))
  return(
    <Container textAlign='left'>
      <Form onSubmit={props.handleSubmit}>
        <Form.Input label="Service Title:" type='text' value={props.title} onChange={props.handleInputChange} id='title'/>
        <Form.TextArea autoHeight label="Service Description:" value={props.description} onChange={props.handleInputChange} id='description'/>
        <Form.Input label="SLA:" type='number' value={props.sla} onChange={props.handleInputChange} id='sla'/>
        <Dropdown fluid search selection placeholder='SDL' id='sdl' value={props.sdl} onChange={props.handleInputChange} options={staff} />
        <br/>
        <Dropdown fluid search selection placeholder='Division' id='division' value={props.division} onChange={props.handleInputChange} options={divisions} />
        <br/>
        <Button type='submit' onClick={props.handleSubmit}>Submit</Button>
      </Form>
    </Container>
  )
}
