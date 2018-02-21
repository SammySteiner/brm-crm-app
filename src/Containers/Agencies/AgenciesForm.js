import React from 'react'
import { Container, Form, Button } from 'semantic-ui-react'

export default (props) => {
  return(
    <Container textAlign='left'>
        <Form onSubmit={props.handleSubmit} >
          <Form.Input label="Agency Name: " type='text' value={props.name} onChange={props.handleInputChange} id='name'/>
          <Form.Input label="Agency Acronym: " type='text' value={props.acronym} onChange={props.handleInputChange} id='acronym'/>
          <Form.Input label="Agency Address: " type='text' value={props.address} onChange={props.handleInputChange} id='address'/>
          <Form.Group >
            <label>Category: </label>
            <Form.Radio label='1' value="1" checked={props.category === "1"} onChange={props.handleRadioChange} />
            <Form.Radio label='2' value="2" checked={props.category === "2"} onChange={props.handleRadioChange} />
            <Form.Radio label='3' value="3" checked={props.category === "3"} onChange={props.handleRadioChange} />
          </Form.Group>
          <Form.Checkbox id='mayoral' label="Mayoral? " type='checkbox' checked={props.mayoral} onChange={props.handleInputChange} />
          <Form.Checkbox id='citynet' label="Access to CityNet? " type='checkbox' checked={props.citynet} onChange={props.handleInputChange} />
          <Button type='submit' onClick={props.handleSubmit}>Submit</Button>
      </Form>
    </Container>
  )
}
