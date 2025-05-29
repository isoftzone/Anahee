import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { BASE_URL } from "../../config"; // Adjust path based on your project
const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  const [aboutData, setAboutData] = useState([]);
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/get-exchange-policy?companyid=1&sectionname=About Us`
        );
        const data = await response.json();
        console.log("API response:", data);
        // If API returns { policies: [...] }
        setAboutData(data.policies || []);
      } catch (error) {
        console.error("Error fetching about section:", error);
      }
    };
    fetchAboutData();
  }, []);
  return (
    <div className={clsx("welcome-area mb-5", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        {aboutData.length > 0 ? (
          aboutData.map((section, index) => (
            <div className="welcome-content text-center mb-6" key={index}>
              {/* <h5>{section.sectionname || "Who Are We"}</h5> */}
              <h1>{section.sectionname || "Welcome To Anahee"}</h1>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))
        ) : (
          <div className="welcome-content text-center">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};
SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};
export default SectionTitleWithText;