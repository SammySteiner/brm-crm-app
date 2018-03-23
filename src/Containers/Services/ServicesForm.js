import React from 'react'
import { Dropdown, Form, Button, Container } from 'semantic-ui-react'


export default (props) => {
  var staff = [{key: '', value: '', text: ''}]
  props.staffNames.sort().forEach( (s, i) => staff.push({ key: i, value: s, text: s }))
  var soStaff = [{key: '', value: '', text: ''}]
  props.soStaff.sort().forEach( (s, i) => soStaff.push({ key: i, value: s, text: s }))
  var sdlStaff = [{key: '', value: '', text: ''}]
  props.sdlStaff.sort().forEach( (s, i) => sdlStaff.push({ key: i, value: s, text: s }))
  var divisions = [{key: '', value: '', text: ''}]
  props.divisionNames.forEach( (d, i) => divisions.push({ key: i, value: d, text: d }))
  return(
    <Container textAlign='left'>
      <Form onSubmit={props.handleSubmit}>
        <Form.Input label="Service Title:" type='text' value={props.title} onChange={props.handleInputChange} id='title'/>
        <Form.TextArea autoHeight label="Service Description:" value={props.description} onChange={props.handleInputChange} id='description'/>
        <Form.Input label="SLA:" type='number' value={props.sla} onChange={props.handleInputChange} id='sla'/>
        <Form.Field >
          <label>Service Delivery Lead:</label>
          <Dropdown fluid search selection placeholder='Search...' id='sdl' value={props.sdl} onChange={props.handleInputChange} options={sdlStaff} />
        </Form.Field>
        <Form.Field >
          <label>Service Owner:</label>
          <Dropdown fluid search selection placeholder='Search...' id='service_owner' value={props.service_owner} onChange={props.handleInputChange} options={soStaff} />
        </Form.Field>
        <Form.Field >
          <label>Division:</label>
          <Dropdown fluid search selection placeholder='Search...' id='division' value={props.division} onChange={props.handleInputChange} options={divisions} />
        </Form.Field>
        <Button type='submit' onClick={props.handleSubmit}>Submit</Button>
      </Form>
    </Container>
  )
}
