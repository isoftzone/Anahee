import PropTypes from "prop-types";  
import { Link } from "react-router-dom";  

const HeroSliderFourteenSingle = ({ data }) => {  
  return (  
    <div  
      className="slider-height-5 d-flex align-items-center bg-img"  
      style={{ backgroundImage: `url(${data.images})` }}  
    >  
      <div className="container">  
        <div className="row">  
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">  
            <div className="slider-content-6 slider-animated-1 text-center">  
              {/* <h1 className="animated">  
                {data.title}   
                {data.titleImage && (  
                  <img src={process.env.PUBLIC_URL + data.titleImage} alt="Title Logo" className="title-logo" />  
                )}  
              </h1>   */}
              {/* <p className="animated">{data.subtitle}</p>   */}
              <div className="slider-btn-5 btn-hover">  
                <Link  
                  className="animated"  
                  to={process.env.PUBLIC_URL + data.url}  
                >  
                  SHOP NOW  
                </Link>  
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

HeroSliderFourteenSingle.propTypes = {  
  data: PropTypes.shape({  
    title: PropTypes.string,  
    subtitle: PropTypes.string,  
    image: PropTypes.string,  
    url: PropTypes.string,  
    titleImage: PropTypes.string, // Added prop type for titleImage  
  }).isRequired,  
};  

export default HeroSliderFourteenSingle;