import React from 'react'

export default function FeaturesHome(props) {
  return (
        <div className="container">
        <div className="row">
            <div className="col-1">
                <i className="fa-solid fa-circle-check" style={{color:"black"}}></i>
            </div>
            <div className="col-6">
                <h6>{props.title}</h6>
            </div>
            
        </div>
        </div>
  )
}
