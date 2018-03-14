import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default ( props ) => {
  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item name='/' content='Home' onClick={props.handleItemClick} />
        <Menu.Item name='/staff' content='Staff' onClick={props.handleItemClick} />
        <Menu.Item name='/services' content='Services' onClick={props.handleItemClick} />
        <Menu.Item name='/agencies' content='Agencies' onClick={props.handleItemClick} />
        <Menu.Item name='/connections' content='Connections' onClick={props.handleItemClick} />
        {localStorage.id ?
        <Menu.Menu position='right'>
          <Menu.Item content={props.fullname}/>
          <Menu.Item name='/logout' content='Logout' onClick={props.handleLogout} />
        </Menu.Menu>
        :
        null
        }
      </Menu>
    </Segment>
  )
}
