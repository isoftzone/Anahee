import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BASE_URL } from "../../config";

const ShippingLocations = () => {
  let { pathname } = useLocation();
  const [policies, setPolicies] = useState([]);


  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-exchange-policy?companyid=1&sectionname=Shipping Locations`);
        const data = await response.json();
        setPolicies(data.policies || []);
      } catch (error) {
        console.error("Error fetching shipping locations:", error);
      }
    };

    fetchShippingInfo();
  }, []);

  return (
    <LayoutOne headerTop="visible">
      <SEO titleTemplate="Shipping Locations" description="Shipping Locations page." />
      {/* <Breadcrumb
        pages={[
          { label: "Home", path: "/" },
          { label: "Shipping Locations", path: pathname }
        ]}
      /> */}
      <div className="container-fluid mb-5">
        {policies.length > 0 ? (
          policies.map((policy, index) => (
            <div key={index} className="">
              <h3 className="fw-bold">{policy.sectionname}</h3>
              <div dangerouslySetInnerHTML={{ __html: policy.content }}  />
            </div>
          ))
        ) : (
          <p>No shipping information available.</p>
        )}
      </div>
    </LayoutOne>
  );
};

export default ShippingLocations;
