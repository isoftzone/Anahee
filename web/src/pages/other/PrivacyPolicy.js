import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BASE_URL } from "../../config";

const PrivacyPolicy = () => {
  let { pathname } = useLocation();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-exchange-policy?companyid=1&sectionname=Privacy Policy`);
        const data = await response.json();
        setPolicies(data.policies || []);
      } catch (error) {
        console.error("Error fetching Privacy policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <LayoutOne headerTop="visible">
      <SEO titleTemplate="Privacy Policy" description="Privacy Policy page." />
      {/* <Breadcrumb
        pages={[
          { label: "Home", path: "/" },
          { label: "Privacy Policy", path: pathname }
        ]}
      /> */}
      <div className="container mt-4">
        {policies.length > 0 ? (
          policies.map((policy, index) => (
            <div key={index} className="mb-4">
              <h3>{policy.sectionname}</h3>
                <div dangerouslySetInnerHTML={{ __html: policy.content }} />  
            </div>
          ))
        ) : (
          <p>No Privacy policies available.</p>
        )}
      </div>
    </LayoutOne>
  );
};

export default PrivacyPolicy;
