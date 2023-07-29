import React from 'react'

export default function FeaturesHome(props) {
  return (
        <div className="col mx-1 my-3 text-center" style={{backgroundColor: "#f4e2f7", borderRadius: "13px", border: "3px solid #590268",color:"black"}}>
        <div className="row">
            <div className="col-1">
                <i className="fa-solid fa-circle-check" style={{color:"black"}}></i>
            </div>
            <div className="col-10">
                <h6>{props.title}</h6>
            </div>
            
        </div>
        </div>
  )
}
