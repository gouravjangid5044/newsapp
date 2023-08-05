import React, { Component } from 'react'

export default class spiner extends Component {
  render() {
    return (
      <>
    {/* <div className="spinner-overlay">
      <div className="spinner-container"> */}
      <div style={{width:'5%',margin:'auto'}}>

         <span className="loader"></span>
      </div>
      {/* </div>
    </div> */}
        
      </>
    )
  }
}
