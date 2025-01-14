import React from 'react';
//import ButtonComp from '../Button/ButtonComp'
import "./Home.css";
//import { UserContext } from '../../Context/UserContext/UserContext'

// export default function Home() {

//   const { isLogged } = useContext(UserContext)

//   return (
//     <>
//         <div className='Auth-container'>
//           <ButtonComp Label={"Login"} to={"/login"}/>
//           <ButtonComp Label={"Register"} to={"/register"}/>
//           <ButtonComp Label={"Dashboard"} to={isLogged?"/dashboard":"#"} disabled={!isLogged}/>
//         </div>
//       </div>
//     </>
//   )
// }


const Home = () => {

  const sliderContent = [
    {
      heading: "Explore Comprehensive Healthcare Management with MedVault",
      description:
        "Discover a cutting-edge platform with Nearby Hospital Locator, User Login and Health Data Storage, Access to Health Records, and Appointment Scheduling. Empowering users to take control of their healthcare needs.",
      features: [
        "Nearby Hospital Locator",
        "User Login and Health Data Storage",
        "Access to Health Records",
        "Appointment Scheduling",
      ],
      image: "storage.png", 
    },
    {
      heading: "Streamline Healthcare with Innovative Solutions",
      description:
        "MedVault offers seamless integration of advanced APIs for location services, scheduling, and patient data management. A reliable companion for patients and healthcare providers alike.",
      features: [
        "APIs for seamless integration",
        "Scheduling made easy",
        "Secure and private health records",
      ],
      image: "record.png", 
    },
  ];
  //Hexagonal structure
  const structure = [
    {
      title: "Nearby Hospital Locator",
      description: "Find hospitals near you with real-time location data integrated with API.",
      icon: "🏥", 
    },
    {
      title: "User Login and Health Data Storage",
      description: "Secure user login and storage of health data for easy access and management.",
      icon: "🔒", 
    },
    {
      title: "Access to Health Records",
      description: "View and manage your health records with integration to FHIR APIs for standardized health data.",
      icon: "📁", 
    },
    {
      title: "Appointment Scheduling",
      description: "Schedule doctor appointments easily using an integrated scheduling API.",
      icon: "📅", 
    },
  ];
  

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>MedVault : Your Health, Secured.</h1>
        <p>Seamlessly Manage Your Health Records and Appointments – All in One Place</p>
      </header>

      {/* Slider Section */}
      <div className="slider-container">
        {sliderContent.map((slide, index) => (
          <div key={index} className="slider-slide">
            <div className="slider-text">
              <h1>{slide.heading}</h1>
              <p>{slide.description}</p>
              <ul>
                {slide.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="slider-image">
              <img src={slide.image} alt={`Slide ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Hexagonal Features Section */}
      <div className="hex-section">
        <header className="hex-header">
          <h1>Why MedVault?</h1>
        </header>
        <div className="hex-container">
          {structure.map((feature, index) => (
            <div className="hexagon" key={index}>
              <div className="hex-content">
                <div className="hex-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


