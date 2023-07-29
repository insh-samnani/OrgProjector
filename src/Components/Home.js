import React from 'react';
import MainPic from '../Images/1.png'
import FeaturesHome from './FeaturesHome';
import ServicesHome from './ServicesHome';
import CarouselItems from './CarouselItems';

const Home = () => {
  const features=[
    {
      sno:1,
      title:"24/7 Support Availaible"
    },
    {
      sno:2,
      title:"End-to-End Encrypted"
    },
    {
      sno:3,
      title:"Modularized and Accessible"
    }
  ]

  const services=[
    
    {
      sno:1,
      title:"Projects:",
      icon:"fa-solid fa-sitemap fa-2xl",
      data:["Admin Supervisory","Invitation to Employees"]
    },
    {
      sno:2,
      title:"Work Items:",
      icon:"fa-solid fa-sheet-plastic fa-2xl",
      data:["Classifying Tags","Status Renewl"]
    },
    {
      sno:3,
      title:"Employees:",
      icon:"fa-solid fa-people-group fa-2xl",
      data:["Updation","Viewership"]
    },{
      sno:4,
      title:"Organizations:",
      icon:"fa-solid fa-briefcase fa-2xl",
      data:["Management","Creation and Updation"]
    }
  ]

  const companies=[
    {
      sno:1,
      name:"google"
    },
    {
      sno:2,
      name:"amazon"
    },
    {
      sno:3,
      name:"microsoft"
    },
    {
      sno:4,
      name:"meta"
    },
    {
      sno:5,
      name:"github"
    },
    {
      sno:6,
      name:"linkedin"
    }
  ]
  const itemsPerSlide= 2; 
  const companiesGroups = [];
  for (let i = 0; i < companies.length; i += itemsPerSlide) {
    companiesGroups.push(companies.slice(i, i + itemsPerSlide));
  }
  return (
    <>
    
      {/* ---------------------------- */}
      {/* Main home view component */}
    <div className="card mb-3" style={{border:"none",backgroundColor:"#725f77",color:"#f4e2f7"}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={MainPic} className="img-fluid rounded-start" alt="..."/>
        </div>
        <div className="col-md-8" >
          <div className="card-body text-center">
          <h1 style={{ color: "#590268", textShadow: "3px 3px 0 black" }} className="card-title"><b>PROJECT MANAGEMENT<br/> EASY AND SECURE</b></h1>
              <i className="fa-solid fa-shield-halved fa-2xl" style={{color:"black"}}></i>
              <p className="card-text my-3"><i>"Full Control of Your Projects and WorkItems."</i></p>
              
              <br/>
              <div className='container my-3 mx-3'>
                <div className='row'>
              {
                features.map((elem)=>{
                  return(
                    <FeaturesHome key={elem.sno} title={elem.title}/>
                  )
                })
              }
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>

      {/* ---------------------------- */}
      {/* Service home view component */}
      <div className='container my-3 text-center' style={{color:"#f4e2f7"}}>
              <h1 style={{ color: "#590268", textShadow: "3px 3px 0 black" }}>OUR SERVICES</h1>
      </div>
      <br/>
      <div className="card-group my-3">
        {services.map((elem)=>{
          return(
            <ServicesHome key={elem.sno} title={elem.title} icon={elem.icon} data={elem.data}/>
          )
        })}
      </div>

      {/* -------------------------------------------------- */}
      {/* Companies home view component */}
      <br/>
      <div className='container my-3 text-center' style={{color:"#f4e2f7"}}>
              <h1 style={{ color: "#590268", textShadow: "3px 3px 0 black" }}>100+ COMPANIES TRUSTED IN US</h1>
      </div>
      <br/>
      <div className="container text-center" >
          <div id="Carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {companiesGroups.map((group, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <div className="row row-cols-2 justify-content-center align-items-center" style={{ flexWrap: "wrap", height: "100%" }}>
                    {group.map((elem) => (
                      <CarouselItems key={elem.sno} name={elem.name}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#Carousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" style={{backgroundColor:"black"}}></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#Carousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" style={{backgroundColor:"black"}}></span>
              <span className="visually-hidden">Next</span>
            </button>

          </div>
        </div>
    </>
  );
};

export default Home;