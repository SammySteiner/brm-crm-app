import React from 'react'
import ServicesList from './ServicesList.js'

export default(props) => {

  function formattedServicesList(){
    let sortedList = []
    let servicesList = props.sortedAndFilteredList
    for (var i = 0; i < servicesList.length; i++) {
      sortedList.push(<ServicesList handleSelectService={props.handleSelectService} key={i} services={servicesList[i]}/>)
    }
    return sortedList
  }

  return(
    <table className ="services-list">
      <thead>
        <tr>
          <th onClick={props.handleSortTitle.bind(this)} >Title</th>
          <th onClick={props.handleSortDescription.bind(this)} >Description</th>
          <th onClick={props.handleSortDivision.bind(this)} >Division</th>
          <th onClick={props.handleSortSDL.bind(this)} >SDL</th>
        </tr>
      </thead>
      <tbody>
        {formattedServicesList()}
      </tbody>
    </table>
  )
}
