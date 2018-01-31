import React from 'react'
import StaffList from './StaffList.js'

export default(props) => {

  function formattedStaffList(){
    let sortedList = []
    let staffList = props.sortedAndFilteredList
    for (var i = 0; i < staffList.length; i++) {
      sortedList.push(<StaffList handleSelectStaff={props.handleSelectStaff} key={i} staff={staffList[i]}/>)
    }
    return sortedList
  }

  return(
    <table className ="staff-list">
      <thead>
        <tr>
          <th onClick={props.handleSortName.bind(this)} >Name</th>
          <th onClick={props.handleSortRole.bind(this)} >Role</th>
          <th onClick={props.handleSortAgency.bind(this)} >Agency</th>
          <th>Email</th>
          <th>Office Phone</th>
        </tr>
      </thead>
      <tbody>
        {formattedStaffList()}
      </tbody>
    </table>
  )
}
