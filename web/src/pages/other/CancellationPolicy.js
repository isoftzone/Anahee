import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BASE_URL } from "../../config";

const CancellationPolicy = () => {
  let { pathname } = useLocation();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/get-exchange-policy?companyid=1&sectionname=Cancellation Policy`
        );
        const data = await response.json();
        setPolicies(data.policies || []);
      } catch (error) {
        console.error("Error fetching cancellation policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <LayoutOne headerTop="visible">
      <SEO
        titleTemplate="Cancellation Policy"
        description="Cancellation Policy page."
      />
      {/* <Breadcrumb
        pages={[
          { label: "Home", path: "/" },
          { label: "Cancellation Policy", path: pathname },
        ]}
      /> */}
      <div className="container-fluid mb-5 ">
        {policies.length > 0 ? (
          policies.map((policy, index) => (
            <div key={index} className="">
              <h3 className="fw-bold">{policy.sectionname}</h3>
              <div dangerouslySetInnerHTML={{ __html: policy.content }} />
            </div>
          ))
        ) : (
          <p>No cancellation policies available.</p>
        )}
      </div>
    </LayoutOne>
  );
};

export default CancellationPolicy;
