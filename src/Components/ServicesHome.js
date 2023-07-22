import React from 'react'

export default function ServicesHome(props) {
  return (
    <div className="card mx-1 my-3">
        <i className={props.icon} style={{color: "black"}}></i>
            <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <ul className="list-group list-group-flush text-end">
                {
                    props.data.map((elem,index)=>{
                        return(
                            <li key={index} className="list-group-item">{elem}</li>
                        )
                    })
                }
            </ul>
            </div>
        </div>
  )
}
