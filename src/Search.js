import React from 'react'

export default ( props ) => {
  return (
    <div className="search">
      <input
        type="text" value={props.searchTerm}
        onChange={props.handleChange}
      />
      <i className="circular search link icon"></i>
    </div>
  )
}
