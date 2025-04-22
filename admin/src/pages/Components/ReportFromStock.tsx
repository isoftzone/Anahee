import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { BASE_URL } from "../../config";

interface Report {
  FormName: string;
  Control: string;
  NAME: string;
  Type: string;
  Value: string;
  SEQUENCE: string;
}

interface DropdownOptions {
  [key: string]: { FldName: string; FldCode: string; Codetype:string; NAME:string; PRIMENAME:string;WhFldName:string }[];
}

const ReportFromStock: React.FC = () => {
  const [salesDetails, setSalesDetails] = useState<Report[]>([]);
  const [dropdownData, setDropdownData] = useState<DropdownOptions>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );

  useEffect(() => {
    fetchSalesDetail();
  }, []);

  const fetchSalesDetail = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getrfmaster");
      console.log("API Response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setSalesDetails(response.data.data);
        fetchDropdownData(response.data.data); // Fetch dropdown options after getting salesDetails
      } else {
        setSalesDetails([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sales details:", error);
      setError("Failed to fetch sales details. Please try again later.");
      setSalesDetails([]);
      setLoading(false);
    }
  };

//   const fetchDropdownData = async (details: Report[]) => {
//     const dropdownItems = details.filter((item) => item.Control === "Dropdown");

//     const fetchPromises = dropdownItems.map(async (item) => {
//         try {
//           const response = await axios.post(`${BASE_URL}/postcmbAW`, {
//             TblName: "MASTER",
//             FldName: "PRIMENAME",
//             FldCode: "PRIMEKEYID",
//             OrdBy: "SEQUENCE",
//             WhFldName: [
//               "Product",
//               "Status",
//               "Colour",
//               "Brand",
//               "Style",
//               "Size",
//               "Buyer",
//               "Season",
//               "Company",
//               "Section",
//               "Category",
//             ], // Ensure your backend handles an array of field names properly
//           });
//           console.log("hello",response)
      
//           return { key: item.NAME, data: response.data[item.Value] || [] };
//         } catch (error) {
//           console.error(`Error fetching dropdown data for ${item.NAME}:`, error);
//           return { key: item.NAME, data: [] };
//         }
//       });
      

//     const results = await Promise.all(fetchPromises);
//     const dropdownOptions: DropdownOptions = {};
//     results.forEach(({ key, data }) => {
//       dropdownOptions[key] = data;
//     });

//     setDropdownData(dropdownOptions);
//   };


const fetchDropdownData = async (details: Report[]) => {
    const dropdownItems = details.filter((item) => item.Control === "Dropdown");
  
    const fetchPromises = dropdownItems.map(async (item) => {
                try {
                  const response = await axios.post(`${BASE_URL}/postcmbAW`, {
                    TblName: "MASTER",
                    FldName: "PRIMENAME",
                    FldCode: "PRIMEKEYID",
                    OrdBy: "SEQUENCE",
                    // WhFldName: [
                    //   "Product",
                    //   "Status",
                    //   "Colour",
                    //   "Brand",
                    //   "Style",
                    //   "Size",
                    //   "Buyer",
                    //   "Season",
                    //   "Company",
                    //   "Section",
                    //   "Category",
                    // ], // Ensure your backend handles an array of field names properly
                    WhFldName: dropdownItems.map((i) => i.NAME), // Fetch only required fields
                  });
                  console.log("hello",response)
  
        console.log(`Dropdown data for ${item.NAME}:`, response.data);
        console.log("Dropdown Data:", dropdownData[item.NAME]); 
        const data = Array.isArray(response.data) ? response.data : 
        response.data.data ? response.data.data : 
        response.data[item.Value] ? response.data[item.Value] : [];
        // return { key: item.NAME, data: response.data?.[item.Value] ?? [] };  // Ensure fallback for undefined values
        return { key: item.NAME, data: response.data[item.NAME]?.map((d: any) => d.PRIMENAME) || [] };  
    } catch (error) {
        console.error(`Error fetching dropdown data for ${item.NAME}:`, error);
        return { key: item.NAME, data: [] };
      }
    });
  
    const results = await Promise.all(fetchPromises);
    const dropdownOptions: DropdownOptions = {};
    results.forEach(({ key, data }) => {
      dropdownOptions[key] = data;
    });
  
    setDropdownData(dropdownOptions);
  };
  

  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <nav
        className={`sidebarr fixed min-h-screen h-full top-[6%] bottom-0 w-[250px] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="dark:bg-black h-full">
          <div className="flex justify-between items-center m-1 pt-5">
            <NavLink to="" className="main-logo flex items-center shrink-0"></NavLink>
          </div>

          {/* Dynamic Form Section */}
          <div className="shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] bg-white ms-3 pt-3 filter-section">
            <table className="max-h-[840px] overflow-y-auto border border-gray-300 p-2">
              <tbody className="overflow-y-auto block max-h-[840px]">
                {salesDetails.map((item, ind) => (
                  <tr key={ind} className="p-2">
                    <td className="p-4 font-bold">{item.NAME}</td>
                    <td>
                      {item.Control === "Dropdown" ? (
                   <select className="border border-gray-300 rounded px-2 py-1">
                   <option value="">-- Select --</option>
                   {dropdownData[item.NAME] && dropdownData[item.NAME].length > 0 ? (
                       dropdownData[item.NAME].map((option: any, index: number) => {
                           console.log("Rendering option:", option); // Debugging log
                           return (
                               <option key={index} value={option}>{option}</option>
                           );
                       })
                   ) : (
                       <option disabled>No options available</option>
                   )}
               </select>
               
               
                             
                                    
                      ) : item.Control === "input" ? (
                        <input
                          type="text"
                          className="border border-gray-300 rounded px-2 py-1"
                          placeholder={item.NAME}
                        />
                      ) : item.Control === "checkbox" ? (
                        <input type="checkbox" />
                      ) : (
                        <span>Unsupported Control</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ReportFromStock;
