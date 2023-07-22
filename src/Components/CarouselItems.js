import React from 'react'

export default function CarouselItems(props) {
  return (
    
    <div className="card text-center mb-4 mx-2" style={{ maxWidth: "300px", width: "100%", minWidth: "200px" }}>
  <div className="card-body">
    <div>
      <i style={{ color: "black", fontSize: "25px", maxWidth: "100px" }} className={`fa-brands fa-${props.name} fa-2xl`}></i>
      <h3 className='my-3' style={{ fontSize: "15px" }}>{props.name.toUpperCase()}</h3>
    </div>
  </div>
</div>

    

  )
}
