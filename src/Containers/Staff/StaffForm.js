import React from 'react'
import { Dropdown, Form, Button, Container } from 'semantic-ui-react'

export default (props) => {
  var agencies = [{key: '', value: '', text: ''}]
  props.agencyNames.forEach( (a, i) => agencies.push({ key: i, value: a, text: a }))
  var services_list = [{key: '', value: '', text: ''}]
  props.services_list.sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).forEach( s => services_list.push({ key: s.id, value: s.title, text: s.title }))
  var unassigned_sdl_services = [{key: '', value: '', text: ''}]
  props.services_list.filter( s => !s.sdl_id).sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).forEach( s => unassigned_sdl_services.push({ key: s.id, value: s.title, text: s.title }))
  var unassigned_so_services = [{key: '', value: '', text: ''}]
  props.services_list.filter( s => !s.service_owner_id).sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)).forEach( s => unassigned_so_services.push({ key: s.id, value: s.title, text: s.title }))
  var unassigned_agencies = [{key: '', value: '', text: ''}]
  props.agencies.filter( a => !props.arms.some( arm => arm.agency_id === a.id && arm.arm_id !== props.id )).sort( (a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).forEach( ua => unassigned_agencies.push({ key: ua.id, value: ua.name, text: ua.name }))
  var roles = [{key: '', value: '', text: ''}]
  if (props.agency === "INFORMATION TECHNOLOGY AND TELECOMMUNICATIONS, DEPARTMENT OF") {
    props.roles.forEach( (r, i) => roles.push({ key: i, value: r, text: r }))
  } else {
    props.roles.filter(  r =>  (r !== "SDL" && r !== "Service Owner" && r !== "ARM Manager" && r !== "ARM" && r !== "Service Provider") ).forEach( (r, i) => roles.push({ key: i, value: r, text: r }))
  }
  var requiredFields = !(props.first_name && props.last_name && props.email && props.agency)
  return(
    <Container textAlign='left'>
    <Form onSubmit={props.handleSubmit}>
      <Form.Input required label="Staff First Name:" type='text' value={props.first_name} onChange={props.handleInputChange} id='first_name'/>
      <Form.Input required label="Staff Last Name:" type='text' value={props.last_name} onChange={props.handleInputChange} id='last_name'/>
      <Form.Input required label="Staff Email:" type='text' value={props.email} onChange={props.handleInputChange} id='email'/>
      <Form.Input label="Staff Office Phone:" type='tel' value={props.office_phone} onChange={props.handleInputChange} id='office_phone'/>
      <Form.Input label="Staff Cell Phone:" type='tel' value={props.cell_phone} onChange={props.handleInputChange} id='cell_phone'/>
      <Form.Field required>
        <label>Agency:</label>
        <Dropdown fluid search selection placeholder='Search...' id='agency' value={props.agency} onChange={props.handleInputChange} options={agencies} />
      </Form.Field>
      <Form.Field required>
        <label>Role:</label>
        <Dropdown fluid required search selection placeholder='Search...' id='role' value={props.role} onChange={props.handleInputChange} options={roles} />
      </Form.Field>
      {(props.role === "SDL") ?
      <Form.Field >
        <label>Services as SDL:</label>
        <Dropdown fluid search selection multiple placeholder='Search...' id='sdl_services' value={props.sdl_services} onChange={props.handleInputChange} options={props.path === '/staff/new' ? unassigned_sdl_services : services_list} />
      </Form.Field>
      : null}
      {(props.role === "Service Owner") ?
      <Form.Field >
        <label>Services as Service Owner:</label>
        <Dropdown fluid search selection multiple placeholder='Search...' id='so_services' value={props.so_services} onChange={props.handleInputChange} options={props.path === '/staff/new'? unassigned_so_services : services_list} />
      </Form.Field>
      : null}
      {/* {(props.role === "Service Provider") ?
      <Form.Field >
        <label>Services as Service Provider:</label>
        <Dropdown fluid search selection multiple placeholder='Search...' id='provider_services' value={props.provier_services} onChange={props.handleInputChange} options={services_list} />
      </Form.Field>
      : null} */}
      {props.role === "ARM" ?
      <Form.Field >
        <label>Assignments:</label>
        <Dropdown fluid search selection multiple placeholder='Search...' id='assignments' value={props.assignments} onChange={props.handleInputChange} options={unassigned_agencies} />
      </Form.Field>
      : null}
      <Button disabled={requiredFields} color='blue' type='submit' onClick={props.handleSubmit}>Submit</Button>
    </Form>
  </Container>

  )
}
