import React from 'react'
import AgenciesList from './AgenciesList.js'

export default(props) => {

  function formattedAgenciesList(){
    let sortedList = []
    let agenciesList = props.sortedAndFilteredList
    for (var i = 0; i < agenciesList.length; i++) {
      sortedList.push(<AgenciesList
        key={i}
        handleSelectAgency={props.handleSelectAgency}
        handleSelectStaff={props.handleSelectStaff}
        agencies={agenciesList[i]}
      />)
    }
    return sortedList
  }

  return(
    <table className ="agencies-list">
      <thead>
        <tr>
          <th onClick={props.handleSortName.bind(this)} >Name</th>
          <th onClick={props.handleSortAcronym.bind(this)} >Acronym</th>
          <th onClick={props.handleSortCIO.bind(this)} >CIO</th>
          <th onClick={props.handleSortCommissioner.bind(this)} >Commissioner</th>
          <th onClick={props.handleSortARM.bind(this)} >ARM</th>
          <th onClick={props.handleSortMayoral.bind(this)} >Mayoral</th>
        </tr>
      </thead>
      <tbody>
        {formattedAgenciesList()}
      </tbody>
    </table>
  )
}
