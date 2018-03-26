import React from 'react'
import { Input } from 'semantic-ui-react'

export default ( props ) => {
  return (
      <Input
        type="text" value={props.searchTerm}
        placeholder="Search..."
        onChange={props.handleChange}
        id='search'
      />
  )
}
