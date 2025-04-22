import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BASE_URL } from "../../config";

const TermsAndConditions = () => {
  let { pathname } = useLocation();
  const [policies, setPolicies] = useState([]);
  // const [terms, setterms] = useState([]);
 



  useEffect(() => {
    const fetchterms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-exchange-policy?companyid=1&sectionname=Terms And Conditions`);
        const data = await response.json();
        setPolicies(data.policies || []);
      } catch (error) {
        console.error("Error fetching exchange policies:", error);
      }
    };

    fetchterms();
  }, []);

  return (
    <LayoutOne headerTop="visible">
      <SEO titleTemplate="Terms and Conditions" description="Terms and Conditions page." />
      {/* <Breadcrumb
        pages={[
          { label: "Home", path: "/" },
          { label: "Terms and Conditions", path: pathname }
        ]}
      /> */}
      <div className="container mt-4">
        {policies.length > 0 ? (
          policies.map((policy, index) => (
            <div key={index} className="mb-4">
              <h3>{policy.sectionname}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: policy.content }}
                style={{
                  listStyleType: 'disc',
                  padding: '20px'
                }}
              />
            </div>
          ))
        ) : (
          <p>No terms and conditions available.</p>
        )}
      </div>
    </LayoutOne>
  );
};

export default TermsAndConditions;
