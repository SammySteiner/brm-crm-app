import React from 'react'
import { Container, Form, Button, Dropdown } from 'semantic-ui-react'

export default (props) => {
  var st = new Date(props.start_time)
  var ro = new Date(props.resolved_on)
  var ten = function(i){
    return (i < 10 ? '0' : '') + i
  }
  var start_time = `${st.getFullYear()}-${ten(st.getMonth()+1)}-${ten(st.getDate())}T${ten(st.getHours())}:${ten(st.getMinutes())}`
  var resolved_on = `${ro.getFullYear()}-${ten(ro.getMonth()+1)}-${ten(ro.getDate())}T${ten(ro.getHours())}:${ten(ro.getMinutes())}`
  var types = [{key: '', value: '', text: ''}]
  props.types.sort().forEach( (t, i) => types.push({ key: i, value: t, text: t }))
  var services = [{key: '', value: '', text: ''}]
  props.services.sort().forEach( (t, i) => services.push({ key: i, value: t, text: t }))
  var connections_list = [{key: '', value: '', text: ''}]
  props.connections.sort( (a, b) => a.date < b.date ? 1 : -1).forEach( (c, i) => connections_list.push({ key: i, value: c.title, text: c.title }))
  var staff = [{key: '', value: '', text: ''}]
  props.staff.sort().forEach( (a, i) => staff.push({ key: i, value: a, text: a }))
  return(
    <Container textAlign='left'>
        <Form onSubmit={props.handleSubmit} >
          <Form.Input label="Engagement Start Time: " type='datetime-local' value={start_time} onChange={props.handleInputChange} id='start_time'/>
          <Form.Field >
            <label>Type:</label>
            <Dropdown fluid search selection placeholder='Search...' id='type' value={props.type} onChange={props.handleInputChange} options={types} />
          </Form.Field>
          <Form.Field >
            <label>Service:</label>
            <Dropdown fluid search selection placeholder='Search...' id='service' value={props.service} onChange={props.handleInputChange} options={services} />
          </Form.Field>
          <Form.Field >
            <label>Connection:</label>
            <Dropdown fluid search selection placeholder='Search...' id='connection' value={props.connection} onChange={props.handleInputChange} options={connections_list} />
          </Form.Field>
          <Form.Field >
            <label>Team:</label>
            <Dropdown fluid search selection multiple placeholder='Search...' id='team' value={props.team} onChange={props.handleInputChange} options={staff} />
          </Form.Field>
          <Form.Group >
            <Form.Field>
              <label>Priority: </label>
            </Form.Field>
            <Form.Radio label='1' value="1" checked={props.priority === "1"} onChange={props.handleRadioChange} />
            <Form.Radio label='2' value="2" checked={props.priority === "2"} onChange={props.handleRadioChange} />
            <Form.Radio label='3' value="3" checked={props.priority === "3"} onChange={props.handleRadioChange} />
          </Form.Group>

          {/* <Form.Field >
            <label>ARM:</label>
            <Dropdown fluid search selection placeholder='Search...' id='arm' value={props.arm} onChange={props.handleInputChange} options={arms} />
          </Form.Field>
          <Form.Field >
            <label>Agency:</label>
            <Dropdown fluid search selection placeholder='Search...' id='agency' value={props.agency} onChange={props.handleInputChange} options={agencies} />
          </Form.Field> */}
          <Form.TextArea label="Engagement Notes: " type='textArea' id='notes' value={props.notes} onChange={props.handleInputChange} />
          <Form.TextArea label="Engagement Report: " type='textArea' id='report' value={props.report} onChange={props.handleInputChange} />
          <Form.Input label="INC: " type='text' id='inc' value={props.inc} onChange={props.handleInputChange}/>
          <Form.Input label="KSR: " type='text' id='ksr' value={props.ksr} onChange={props.handleInputChange}/>
          <Form.Input label="PRJ: " type='text' id='prj' value={props.prj} onChange={props.handleInputChange}/>
          <Form.Input label="Engagement Resolution Time: " type='datetime-local' value={resolved_on} onChange={props.handleInputChange} id='resolved_on'/>
          <Button type='submit' onClick={props.handleSubmit}>Submit</Button>
      </Form>
    </Container>
  )
}
