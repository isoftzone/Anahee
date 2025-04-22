import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BASE_URL } from "../../config";

const RefundPolicy = () => {
  let { pathname } = useLocation();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-exchange-policy?companyid=1&sectionname=Refund Policy`);
        const data = await response.json();
        setPolicies(data.policies || []);
      } catch (error) {
        console.error("Error fetching refund policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <LayoutOne headerTop="visible">
      <SEO titleTemplate="Refund Policy" description="Refund Policy page." />
      {/* <Breadcrumb
        pages={[
          { label: "Home", path: "/" },
          { label: "Refund Policy", path: pathname }
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
          <p>No refund policies available.</p>
        )}
      </div>
    </LayoutOne>
  );
};

export default RefundPolicy;
