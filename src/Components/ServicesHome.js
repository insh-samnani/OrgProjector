import React from 'react'

export default function ServicesHome(props) {
  return (
    <div className="card mx-1 my-3" style={{backgroundColor: "#f4e2f7", borderRadius: "13px", border: "3px solid #590268"}}>
        <i className={props.icon} style={{color: "black"}}></i>
            <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <ul className="list-group list-group-flush text-end">
                {
                    props.data.map((elem,index)=>{
                        return(
                            <li style={{backgroundColor: "#f4e2f7", borderRadius: "13px", border: "3px solid #590268"}}key={index} className="list-group-item my-1">{elem}</li>
                        )
                    })
                }
            </ul>
            </div>
        </div>
  )
}
