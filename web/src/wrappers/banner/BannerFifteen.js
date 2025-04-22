import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import BannerFifteenSingle from "../../components/banner/BannerFifteenSingle";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const BannerFifteen = ({ spaceTopClass, spaceBottomClass }) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/images`)
      .then((response) => {
        console.log("✅ API Response:", response.data); // ✅ Log API Response
        // const filteredImages = response.data.images.filter((images) => 
        //   [8, 9, 10].includes(images.id)
        // );
        setBanners(response.data.images);
        // setBanners(filteredImages);
      })
      .catch((error) => {
        console.error("❌ Error fetching banners:", error);
      });
  }, []);

  return (
    <div className={clsx("banner-area banner-area-2", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="custom-row-2">
          {banners.length >= 3  ? (
            banners.slice(8, 11).map((single, key) => (
              <div className="col-xl-4 col-md-6" key={key}>
                <BannerFifteenSingle spaceBottomClass="mb-10" data={single} />
              </div>
            ))
          ) : (
            <p>No banners available</p>
          )}
        </div>
      </div>
    </div>
  );
};

BannerFifteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerFifteen;



  
  
  



