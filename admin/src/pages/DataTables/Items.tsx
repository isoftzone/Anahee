import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import { downloadExcel } from 'react-export-table-to-excel';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { IRootState } from '../../store';
import { BASE_URL } from '../../config';
import axios, { AxiosResponse } from 'axios';
import '../../assets/css/tippy.css'


const Items = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Range Search Table'));
    });

    const [clientData, setClientData] = useState<UserData[]>([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    // const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<UserData[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [tempData, setTempData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1); // Explicitly specify type as number
    const [totalPages, setTotalPages] = useState<number>(1); // Explicitly specify type as number
    const [pageSize, setPageSize] = useState<number>(10); // Explicitly specify type as number
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<UserData[]>([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [selectedDealer, setSelectedDealer] = useState("");
    const [selectedBuyer, setSelectedBuyer] = useState("");
    const [selectedSeason, setSelectedSeason] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedPacking, setSelectedPacking] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedBarcode, setSelectedBarcode] = useState("");
    const [selectedSubGroup, setSelectedSubGroup] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");


    interface UserData {
        BARCODE: string;
        BOXSIZE: string;
        BRAND: string;
        BUYER: string;
        CATEGORY: string;
        CESS: number;
        COLOR: string;
        COMPANY: string;
        COMPANYID: number;
        CREATEDBY: string;
        CREATEDON: string;
        CUSTOME: string;
        DEALERCODE: string;
        DEALERID: number;
        DEALERNAME: string;
        DISCOUNT: number;
        ESAMOUNT: number;
        ESID: number;
        ESTAG: string;
        EXPIRYDAYS: number;
        FLAG: string;
        GENDER: string;
        HSNCODE: string;
        ITEMID: number;
        ITEMNAME: string;
        ITEMTYPE: string;
        I_GROUP: string;
        I_SIZE: string;
        LOOKUP: string;
        MARGIN: number;
        MARKDOWN: string;
        MARKUP: string;
        MATERIAL: string;
        MAXQTY: number;
        MINQTY: number;
        MORP: string;
        MRP: number;
        OMRP: number;
        OTAX: number;
        PACKING: string;
        PHOTO: string;
        PRODUCT: string;
        PURPRICE: number;
        RATE: number;
        REMARK: string;
        REORDERQTY: number;
        SALEPRICE: number;
        SCOLOR: string;
        SEASON: string;
        SECTION: string;
        SHELFNO: string;
        SP1: number;
        SP2: number;
        SP3: number;
        SP4: number;
        STATUS: string;
        STYLE: string;
        SUBCATEGORY: string;
        SUBGROUP: string;
        SUP_COLOR: string;
        TAX: number;
        UNIT: string;
        UPDATEDBY: string;
        UPDATEDON: string;
        WSP: number;
        PRIMENAME:string;
    }

    // interface FormData {
    //     BARCODE: string;
    //     BOXSIZE: string;
    //     BRAND: string;
    //     BUYER: string;
    //     CATEGORY: string;
    //     CESS: number;
    //     COLOR: string;
    //     COMPANY: string;
    //     COMPANYID: number;
    //     CREATEDBY: string;
    //     CREATEDON: string;
    //     CUSTOME: string;
    //     DEALERCODE: string;
    //     DEALERID: number;
    //     DEALERNAME: string;
    //     DISCOUNT: number;
    //     ESAMOUNT: number;
    //     ESID: number;
    //     ESTAG: string;
    //     EXPIRYDAYS: number;
    //     FLAG: string;
    //     GENDER: string;
    //     HSNCODE: string;
    //     ITEMID: number;
    //     ITEMNAME: string;
    //     ITEMTYPE: string;
    //     I_GROUP: string;
    //     I_SIZE: string;
    //     LOOKUP: string;
    //     MARGIN: number;
    //     MARKDOWN: string;
    //     MARKUP: string;
    //     MATERIAL: string;
    //     MAXQTY: number;
    //     MINQTY: number;
    //     MORP: string;
    //     MRP: number;
    //     OMRP: number;
    //     OTAX: number;
    //     PACKING: string;
    //     PHOTO: string;
    //     PRODUCT: string;
    //     PURPRICE: number;
    //     RATE: number;
    //     REMARK: string;
    //     REORDERQTY: number;
    //     SALEPRICE: number;
    //     SCOLOR: string;
    //     SEASON: string;
    //     SECTION: string;
    //     SHELFNO: string;
    //     SP1: number;
    //     SP2: number;
    //     SP3: number;
    //     SP4: number;
    //     STATUS: string;
    //     STYLE: string;
    //     SUBCATEGORY: string;
    //     SUBGROUP: string;
    //     SUP_COLOR: string;
    //     TAX: number;
    //     UNIT: string;
    //     UPDATEDBY: string;
    //     UPDATEDON: string;
    //     WSP: number;
    // }

    // const [formData, setFormData] = useState<FormData>({
    //     COMPANYID: '',
    //     AGENTID: '',
    //     AFIRMNAME: '',
    //     ACTELEPHONENO: '',
    //     ACMOBILENO: '',
    //     ACADDRESSLINE1: '',
    //     ACADDRESSLINE2: '',
    //     ACADDRESSLINE3: '',
    //     STATUS: '',
    //     AGENTNAME: '',
    //     ADOB: '',
    //     APERSONALIDTYPE: '',
    //     APERSONALID: '',
    //     APMOBILENO: '',
    //     APEMAILID: '',
    //     APADDRESSLINE1: '',
    //     APADDRESSLINE2: '',
    //     APADDRESSLINE3: '',
    //     APCITY: '',
    //     APSTATE: '',
    //     APCOUNTRY: '',
    //     APDISTRICT: '',
    //     APPINCODE: '',
    //     ABANKNAME: '',
    //     AACCOUNTTYPE: '',
    //     AACCOUNTNO: '',
    //     AACCOUNTHOLDERNAME: '',
    //     ABRANCHNAME: '',
    //     AIFSCCODE: '',
    //     ACHEQUENO: '',
    //     ACHEQUEREMARK: '',
    //     AMICRCODE: '',
    //     ATPNOBANK: '',
    //     CREATEDBY: '',
    //     CREATEDON: '',
    //     UPDATEDBY: '',
    //     UPDATEDON: '',
    //     ACCITY: '',
    //     ACSTATE: '',
    //     ACCOUNTRY: '',
    //     ACDISTRICT: '',
    //     ACPINCODE: '',
    //     REMARK: '',
    // });


    // const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { name, value } = event.target;
    //     if (name === 'Item Name') {
    //         setSelectedItem(value);
    //     } else if (name === 'Brand') {
    //         setSelectedBrand(value);
    //     } else if (name === 'Color') {
    //         setSelectedColor(value);
    //     } else if (name === 'Size') {
    //         setSelectedSize(value);
    //     }
    //     else if (name === 'Style') {
    //         setSelectedStyle(value);
    //     }
    //     else if (name === 'Material') {
    //         setSelectedMaterial(value);
    //     }
    //     else if (name === 'Dealer') {
    //         setSelectedDealer(value);
    //     }
    //     else if (name === 'Buyer') {
    //         setSelectedBuyer(value);
    //     }
    //     else if (name === 'Season') {
    //         setSelectedSeason(value);
    //     }
    //     else if (name === 'Company') {
    //         setSelectedCompany(value);
    //     }

    //     else if (name === 'Packing') {
    //         setSelectedPacking(value);
    //     }
    //     else if (name === 'Section') {
    //         setSelectedSection(value);
    //     }
    //     else if (name === 'Group') {
    //         setSelectedGroup(value);
    //     }
    //     else if (name === 'Barcode') {
    //         setSelectedBarcode(value);
    //     }
    //     else if (name === 'Sub-Group') {
    //         setSelectedSubGroup(value);
    //     }
    //     else if (name === 'Category') {
    //         setSelectedCategory(value);
    //     }
    //     else if (name === 'Sub-Category') {
    //         setSelectedSubCategory(value);
    //     }
    //     else if (name === 'Unit') {
    //         setSelectedUnit(value);
    //     }
    //     else if (name === 'Status') {
    //         setSelectedStatus(value);
    //     }
    // }
    const handleSearch = () => {
        const filteredData = initialRecords.filter(record => {
            return(selectedStatus === "" || record.STATUS === selectedStatus) &&
            (selectedItem === "" || record.ITEMNAME === selectedItem) &&
            // (selectedProduct === "" || record.PRODUCT === selectedProduct) &&
            (selectedBrand === "" || record.BRAND === selectedBrand) &&
            (selectedSize === "" || record.I_SIZE === selectedSize) &&
            (selectedStyle === "" || record.STYLE === selectedStyle) &&
            (selectedMaterial === "" || record.MATERIAL === selectedMaterial) &&
            (selectedDealer === "" || record.DEALERNAME === selectedDealer) &&
            (selectedBuyer === "" || record.BUYER === selectedBuyer) &&
            (selectedSeason === "" || record.SEASON === selectedSeason) &&
            (selectedPacking === "" || record.PACKING === selectedPacking) &&
            (selectedSection === "" || record.SECTION === selectedSection) &&
            (selectedGroup === "" || record.I_GROUP === selectedGroup) &&
            (selectedBarcode === "" || record.BARCODE === selectedBarcode) &&
            (selectedSubGroup === "" || record.SUBGROUP === selectedSubGroup) &&
            (selectedCategory === "" || record.CATEGORY === selectedCategory) &&
            (selectedSubCategory === "" || record.SUBCATEGORY === selectedSubCategory) &&
            (selectedUnit === "" || record.UNIT === selectedUnit)&&
            (selectedColor === "" || record.COLOR === selectedColor)&&
            (selectedCompany === "" || record.COMPANY === selectedCompany); 
        });
        setRecordsData(filteredData);
    }

    const handleReset = () => {
        setSelectedItem("");
        // setSelectedProduct("");
        setSelectedBrand("");
        setSelectedSize("");
        setSelectedColor("");
        setSelectedStyle("");
        setSelectedMaterial("");
        setSelectedDealer("");
        setSelectedBuyer("");
        setSelectedSeason("");
        setSelectedCompany("");
        setSelectedPacking("");
        setSelectedSection("");
        setSelectedGroup("");
        setSelectedBarcode("");
        setSelectedSubGroup("");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedUnit("");
        setSelectedStatus("");
        
        setRecordsData(initialRecords.slice(0, 10));
    }

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

        interface Record {
            PRIMENAME: string;
        }


    // useEffect(() => {
    //     fetch(`${BASE_URL}/getItem`)
    //         .then(response => response.json())
    //         .then(data => {
    //             let detail = data;
    //             setClientData(detail);
    //             setInitialRecords(data);
    //             setRecordsData(data)
    //             setTempData(data)
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);
   const [products, setProducts] = useState<Record[]>([]);
  const [colors, setColors] = useState<Record[]>([]);
  const [brands, setBrands] = useState<Record[]>([]);
  const [statuses, setStatuses] = useState<Record[]>([]);
  const [styles, setStyles] = useState<Record[]>([]);
  const [sizes, setSizes] = useState<Record[]>([]);
  const [buyers, setBuyers] = useState<Record[]>([]);
  const [seasons, setSeasons] = useState<Record[]>([]);
  const [company, setCompany] = useState<Record[]>([]);
  const [sections, setSections] = useState<Record[]>([]);
  const [category, setCategory] = useState<Record[]>([]);

  
    // useEffect(() => {
    //   const fetchData = async (fieldName: string, setState: React.Dispatch<React.SetStateAction<Record[]>>) => {
    //     try {
    //       const response = await axios.post(`${BASE_URL}/postcmbAW`, {
    //         TblName: 'MASTER',
    //         FldName: 'PRIMENAME',
    //         FldCode: 'PRIMEKEYID',
    //         OrdBy: 'SEQUENCE',
    //         WhFldName: fieldName
    //       }, {
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       });
    //       console.log("response from apiIIIIIII",response.data);
    //       setProducts(response.data);

    //     } catch (error) {
    //       console.error(`Error fetching data for ${fieldName}`, error);
    //     }
    //   };
  
    //   fetchData('Product', setProducts);
    //   fetchData('Color', setColors);
    //   fetchData('Brand', setBrands);
    //   fetchData('Status', setStatuses);
    // }, []); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(`${BASE_URL}/postcmbAW`, {TblName: 'MASTER',FldName: 'PRIMENAME',FldCode: 'PRIMEKEYID',OrdBy: 'SEQUENCE',WhFldName: ['Product', 'Status','Colour','Brand','Style','Size','Buyer','Season','Company','Section','Category'] // Modify your backend to handle an array of field names
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            });
            console.log("Combined API response:", response.data);
            setProducts(response.data.Product);
            setStatuses(response.data.Status);
            setBrands(response.data.Brand);
            setColors(response.data.Colour);
            setStyles(response.data.Style);
            setSizes(response.data.Size);
            setBuyers(response.data.Buyer)
            setSeasons(response.data.Season)
            setCompany(response.data.Company)
            setSections(response.data.Section)
            setCategory(response.data.Category)
          } catch (error) {
            console.error("Error fetching data", error);
          }
        };
        fetchData();
      }, []);

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log('Selected value:', e.target.value);
    };

//     useEffect(() => {
//         const sendData = async (TblName,FldName) =>{
//           const api = await axios.post(`${BASE_URL}/postcmbAW`,{TblName, FldName,  FldCode: 'PRIMEKEYID', OrdBy: 'SEQUENCE',WhFldName: 'Product'},{
//             headers:{
//                 "Content-Type":"application/json"
//             }
//           })
//           console.log("postcmbAW res new",api.data)
//           setInitialRecords(api.data.PRIMENAME);
//           setProducts(api.data);
//           console.log('selectedRecord',products)
//           console.log('initial value',setInitialRecords)
//         }
// sendData();
//     }, []);

//     useEffect(() => {
//         const sendData = async () =>{
//           const api = await axios.post(`${BASE_URL}/postcmbAW`,{TblName: 'MASTER',  FldName: 'PRIMENAME',  FldCode: 'PRIMEKEYID', OrdBy: 'SEQUENCE',WhFldName: 'Status'},{
//             headers:{
//                 "Content-Type":"application/json"
//             }
//           })
//           console.log("postcmbAW res new",api.data)
//           setInitialRecords(api.data.PRIMENAME);
//           setStatuses(api.data);
//           console.log('selectedRecord',statuses)
//           console.log('initial value',setInitialRecords)
//         }
// sendData();
//     }, []);

    interface ApiResponse {
        totalRecords: number;
        totalPages: number;
        currentPage: number;
        agents: UserData[];
    }


    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response: AxiosResponse<ApiResponse> = await axios.get(`${BASE_URL}/getMasterPagination?page=${currentPage}`);
                const { totalRecords, totalPages, currentPage: fetchedCurrentPage, agents } = response.data;
                setInitialRecords(agents);
                setRecordsData(agents);
                setTempData(agents);
                setTotalPages(totalPages);
                setCurrentPage(fetchedCurrentPage);
                setTotalRecords(totalRecords);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Fetch data when the component mounts or currentPage changes
    }, [currentPage]);


    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return tempData.filter((item) => {
                return (
                    item.COMPANY.toString().includes(search.toLowerCase()) ||
                    item.ITEMNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.DEALERNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.PRODUCT.toLowerCase().includes(search.toLowerCase()) ||
                    item.COLOR.toLowerCase().includes(search.toLowerCase()) ||
                    item.ITEMTYPE.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.GENDER.toLowerCase().includes(search.toLowerCase()) ||
                    item.CATEGORY.toLowerCase().includes(search.toLowerCase())||
                    item.BRAND.toLowerCase().includes(search.toLowerCase())||
                    item.MATERIAL.toLowerCase().includes(search.toLowerCase())||
                    item.PACKING.toLowerCase().includes(search.toLowerCase())||
                    item.STATUS.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    // const [minAge, setMinAge] = useState<any>('');
    // const [maxAge, setMaxAge] = useState<any>('');

    // useEffect(() => {
    //     let dt = rowData;
    //     if (minAge !== '' && minAge !== null) {
    //         dt = dt.filter((d) => d.age >= Number(minAge));
    //     }
    //     if (maxAge !== '' && maxAge !== null) {
    //         dt = dt.filter((d) => d.age <= Number(maxAge));
    //     }
    //     if (minAge || maxAge) {
    //         setInitialRecords(dt);
    //         setTempData(dt);
    //     }
    // }, [minAge, maxAge]);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const col = ['id', 'agentName', 'agentFirmName', 'company', 'age', 'dob', 'email', 'phone'];
    const header = ['id', 'COMPANYID', 'AGENTID', 'AFIRMNAME', 'ACTELEPHONENO', 'ACMOBILENO', 'ACADDRESSLINE1', 'STATUS', 'AGENTNAME', 'ADOB', 'APERSONALIDTYPE', 'APERSONALID', 'APMOBILENO', 'APEMAILID', 'APADDRESSLINE1', 'APCITY', 'APSTATE', 'APCOUNTRY', 'APDISTRICT', 'APPINCODE', 'ABANKNAME', 'AACCOUNTTYPE', 'AACCOUNTNO', 'AACCOUNTHOLDERNAME', 'ABRANCHNAME', 'AIFSCCODE', 'ACHEQUENO', 'ACHEQUEREMARK', 'AMICRCODE', 'ATPNOBANK', 'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDBY', 'UPDATEDON', 'ACCITY', 'ACCOUNTRY', 'ACDISTRICT', 'ACPINCODE', 'Remark'];

    const exportTable = (type: any) => {
        let columns: any = header;
        let records = initialRecords;
        let filename = 'table';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            // eslint-disable-next-line array-callback-return
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                rowhtml += '<tr>';
                // eslint-disable-next-line array-callback-return
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link1 = document.createElement('a');
                link1.setAttribute('href', data1);
                link1.setAttribute('download', filename + '.txt');
                link1.click();
            } else {
                var blob1 = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob1, filename + '.txt');
                }
            }
        }
    };


    function handleDownloadExcel() {
        const col: Array<keyof UserData> = [
             "BARCODE","BOXSIZE","BRAND","BUYER","CATEGORY","CESS","COLOR","COMPANY","COMPANYID","CREATEDBY","CREATEDON","CUSTOME","DEALERCODE","DEALERID","DEALERNAME","DISCOUNT","ESAMOUNT","ESID","ESTAG","EXPIRYDAYS","FLAG","GENDER","HSNCODE","ITEMID","ITEMNAME","ITEMTYPE","I_GROUP","I_SIZE","LOOKUP","MARGIN","MARKDOWN","MARKUP","MATERIAL","MAXQTY","MINQTY","MORP","MRP","OMRP","OTAX","PACKING","PHOTO","PRODUCT","PURPRICE","RATE","REMARK","REORDERQTY","SALEPRICE","SCOLOR","SEASON","SECTION","SHELFNO","SP1","SP2","SP3","SP4","STATUS","STYLE","SUBCATEGORY","SUBGROUP","SUP_COLOR","TAX","UNIT","UPDATEDBY","UPDATEDON","WSP"];
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: recordsData.map(row => col.map(key => row[key]))
            },
        });
    };


    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };


    useEffect(() => {
        dispatch(setPageTitle('Column Chooser Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // show/hide
    const [hideCols, setHideCols] = useState<any>(["BARCODE", "BOXSIZE", "CESS", "COMPANYID", "CREATEDBY", "CREATEDON", "CUSTOME", "DEALERCODE", "DEALERID", "DISCOUNT", "ESAMOUNT", "ESID", "ESTAG", "EXPIRYDAYS", "FLAG", "GENDER", "HSNCODE", "ITEMID", "LOOKUP", "MARGIN", "MARKDOWN", "MARKUP", "MAXQTY", "MINQTY", "MORP", "MRP", "OMRP", "OTAX", "PHOTO","PURPRICE", "RATE", "REMARK", "REORDERQTY", "SALEPRICE", "SCOLOR", "SECTION", "SHELFNO", "SP1", "SP2", "SP3", "SP4", "SUP_COLOR", "TAX", "UNIT", "UPDATEDBY", "UPDATEDON", "WSP"]);



    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'id', title: '#',},
        { accessor: 'ITEMNAME', title: 'Item Name'},
        { accessor: 'ITEMTYPE', title: 'Item Type'},
        { accessor: 'BARCODE', title: 'Barcode' },
        { accessor: 'BOXSIZE', title: 'Box Size' },
        { accessor: 'BRAND', title: 'Brand'},
        { accessor: 'BUYER', title: 'Buyer'},
        { accessor: 'CATEGORY', title: 'Category' },
        { accessor: 'CESS', title: 'Cess' },
        { accessor: 'COMPANY', title: 'Company' },
        { accessor: 'COLOR', title: 'Color' },
        { accessor: 'COMPANYID', title: 'Company ID'},
        { accessor: 'CUSTOME', title: 'Custome'},
        { accessor: 'DEALERCODE', title: 'Dealer Code' },
        { accessor: 'DEALERNAME', title: 'Dealer Name' },
        { accessor: 'DEALERID', title: 'Dealer ID' },
        { accessor: 'DISCOUNT', title: 'Discount' },
        { accessor: 'ESAMOUNT', title: 'ES Amount' },
        { accessor: 'ESID', title: 'ES ID' },
        { accessor: 'ESTAG', title: 'ES Tag' },
        { accessor: 'EXPIRYDAYS', title: 'Expiry Days'},
        { accessor: 'FLAG', title: 'Flag'},
        { accessor: 'GENDER', title: 'Gender'},
        { accessor: 'HSNCODE', title: 'HSN Code'},
        { accessor: 'ITEMID', title: 'Item ID'},
        { accessor: 'I_GROUP', title: 'Group'},
        { accessor: 'I_SIZE', title: 'Size'},
        { accessor: 'LOOKUP', title: 'Lookup'},
        { accessor: 'MARGIN', title: 'Margin'},
        { accessor: 'MARKDOWN', title: 'Markdown'},
        { accessor: 'MARKUP', title: 'Markup'},
        { accessor: 'MATERIAL', title: 'Material'},
        { accessor: 'MAXQTY', title: 'Max Quantity' },
        { accessor: 'MINQTY', title: 'Min Quantity'},
        { accessor: 'MORP', title: 'MORP'},
        { accessor: 'MRP', title: 'MRP'},
        { accessor: 'OMRP', title: 'OMRP'},
        { accessor: 'OTAX', title: 'OTAX'},
        { accessor: 'PACKING', title: 'Packing'},
        { accessor: 'PHOTO', title: 'Photo' },
        { accessor: 'PRODUCT', title: 'Product'},
        { accessor: 'PURPRICE', title: 'Purchase Price'},
        { accessor: 'RATE', title: 'Rate' },
        { accessor: 'REMARK', title: 'Remark'},
        { accessor: 'REORDERQTY', title: 'Reorder Quantity'},
        { accessor: 'SALEPRICE', title: 'Sale Price'},
        { accessor: 'SCOLOR', title: 'Color'},
        { accessor: 'SEASON', title: 'Season'},
        { accessor: 'SECTION', title: 'Section'},
        { accessor: 'SHELFNO', title: 'Shelf No'},
        { accessor: 'SP1', title: 'SP1'},
        { accessor: 'SP2', title: 'SP2'},
        { accessor: 'SP3', title: 'SP3'},
        { accessor: 'SP4', title: 'SP4'},
        { accessor: 'STATUS', title: 'Status'},
        { accessor: 'STYLE', title: 'Style'},
        { accessor: 'SUBCATEGORY', title: 'Subcategory'},
        { accessor: 'SUBGROUP', title: 'Subgroup'},
        { accessor: 'SUP_COLOR', title: 'Supplier Color' },
        { accessor: 'TAX', title: 'Tax'},
        { accessor: 'UNIT', title: 'Unit' },
        { accessor: 'UPDATEDBY', title: 'Updated By'},
        { accessor: 'UPDATEDON', title: 'Updated On'},
        { accessor: 'WSP', title: 'WSP'}

    ];

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     setInitialRecords(() => {
    //         return rowData.filter((item) => {
    //             return (
    //                 item.id.toString().includes(search.toLowerCase()) ||
    //                 item.agentName.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.agentFirmName.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.company.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.email.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
    //                 item.dob.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.phone.toLowerCase().includes(search.toLowerCase())
    //             );
    //         });
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

console.log("mySelectedP",selectedProduct);

    return (
        <div>
            <div className="panel mt-6">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-1">
                    <div className="flex items-center ">
                        <button type="button" onClick={() => exportTable('csv')} className="btn btn-primary btn-sm m-1 ">
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            CSV
                        </button>
                        <button type="button" onClick={() => exportTable('txt')} className="btn btn-primary btn-sm m-1">
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            TXT
                        </button>

                        <button type="button" className="btn btn-primary btn-sm m-1" onClick={handleDownloadExcel}>
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            EXCEL
                        </button>

                        <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">
                            <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                            PRINT
                        </button>


                    </div>
                    <button type="button" className="btn btn-primary btn-sm m-1 w-50 h-5 ltr:mr-2 rtl:ml-2"
                        style={{
                            width: "8%",
                            height: "33px"
                        }}
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button type="button" className="btn btn-primary btn-sm m-1 w-50 h-5 ltr:mr-2 rtl:ml-2"
                        style={{
                            width: "8%",
                            height: "33px"
                        }}
                        onClick={handleSearch}
                    >

                        Search
                    </button>
                    <div className="flex md:items-center md:flex-row flex-col  gap-1">
                        <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                            <div className="flex md:items-center md:flex-row flex-col gap-1">
                                <div className="dropdown">
                                    <Dropdown
                                        placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                        btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                        button={
                                            <>
                                                <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                                <IconCaretDown className="w-5 h-5" />
                                            </>
                                        }
                                    >

                                        <div className="overflow-auto max-h-[300px]">
                                            <ul className="!min-w-[140px]">
                                                {cols.map((col, i) => {
                                                    if (i % 3 === 0) {
                                                        return (
                                                            <li key={i} className="flex md:flex-row flex-col " onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}>
                                                                <div className="flex items-center px-4 py-1 md:w-1/3">
                                                                    <label className="cursor-pointer mb-0 flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={!hideCols.includes(col.accessor)}
                                                                            className="form-checkbox mr-2"
                                                                            defaultValue={col.accessor}
                                                                            onChange={(event) => {
                                                                                setHideCols(event.target.value);
                                                                                showHideColumns(col.accessor, event.target.checked);
                                                                            }}
                                                                        />
                                                                        <span>{col.title}</span>
                                                                    </label>
                                                                </div>
                                                                {cols[i + 1] && (
                                                                    <div className="flex items-center px-4 py-1 md:w-1/3">
                                                                        <label className="cursor-pointer mb-0 flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={!hideCols.includes(cols[i + 1].accessor)}
                                                                                className="form-checkbox mr-2"
                                                                                defaultValue={cols[i + 1].accessor}
                                                                                onChange={(event) => {
                                                                                    setHideCols(event.target.value);
                                                                                    showHideColumns(cols[i + 1].accessor, event.target.checked);
                                                                                }}
                                                                            />
                                                                            <span>{cols[i + 1].title}</span>
                                                                        </label>
                                                                    </div>
                                                                )}
                                                                {cols[i + 2] && (
                                                                    <div className="flex items-center px-4 py-1 md:w-1/3">
                                                                        <label className="cursor-pointer mb-0 flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={!hideCols.includes(cols[i + 2].accessor)}
                                                                                className="form-checkbox mr-2"
                                                                                defaultValue={cols[i + 2].accessor}
                                                                                onChange={(event) => {
                                                                                    setHideCols(event.target.value);
                                                                                    showHideColumns(cols[i + 2].accessor, event.target.checked);
                                                                                }}
                                                                            />
                                                                            <span>{cols[i + 2].title}</span>
                                                                        </label>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </ul>
                                        </div>




                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <table>
                    <tr style={{ display: 'flex', flexDirection: 'row' }} className='responsive' >


                        <label htmlFor="">Item Name
                            <input type="text" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '5px', width: '144px', marginTop: '10px' }} />
                        </label>


                      <label htmlFor="product" style={{ marginLeft: '2%' }}>Product
        <select name="Product" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '10px', width: '144px', marginTop: '10px' }}
          onChange={handleDropdownChange}>
          <option value="">--ALL--</option>
          {products.map((record, index) => (
            <option key={index} value={record.PRIMENAME}>{record.PRIMENAME}</option>
          ))}
        </select>
      </label>


                        <label htmlFor="brand" style={{ marginLeft: '2%' }}>Brand
        <select name="Brand" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '10px', width: '144px', marginTop: '10px' }} onChange={handleDropdownChange}>
          <option value="">--ALL--</option>
          {brands.map((record, index) => (
            <option key={index} value={record.PRIMENAME}>{record.PRIMENAME}</option>
          ))}
        </select>
      </label>

                        <label htmlFor="" style={{ marginLeft: '2%' }}>Size
                            <select name="Size" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '80px', width: '144px', marginTop: '10px' }}
                            value={selectedSize}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            sizes.map((record,index) =>(
                                <option key={index} value={record.PRIMENAME} >{record.PRIMENAME} </option>
                            ))
                        }
                            </select>
                        </label>


                        <label htmlFor="color" style={{ marginLeft: '2%' }}>Color
        <select name="Color" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '10px', width: '144px', marginTop: '10px' }} onChange={handleDropdownChange}>
          <option value="">--ALL--</option>
          {colors.map((record, index) => (
            <option key={index} value={record.PRIMENAME}>{record.PRIMENAME}</option>
          ))}
        </select>
      </label>


                    </tr>

                    <tr style={{ display: 'flex', flexDirection: 'row' }}>

                        <label htmlFor="" style={{ marginLeft: '2%' }}>Style
                            <select name="Style" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '4px', width: '144px', marginTop: '10px' }}
                            // value={selectedStyle}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            styles.map((record,index) =>(
                                <option key={index} value={record.PRIMENAME} >{record.PRIMENAME} </option>
                            ))
                        }
                            </select>
                        </label>

                        <label htmlFor="" style={{ marginLeft: '0px' }}>Material
                            <select name="Material" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '13px', width: '144px' }}
                            value={selectedMaterial}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            initialRecords.map((record,index) =>(
                                <option key={index} value={record.MATERIAL} >{record.MATERIAL} </option>
                            ))
                        }
                            </select>
                        </label>


                        <label htmlFor="" style={{ marginLeft: '2%' }}>Dealer
                            <select name="Dealer" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '3px', width: '144px' }}
                            value={selectedDealer}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            initialRecords.map((record,index) =>(
                                <option key={index} value={record.DEALERNAME} >{record.DEALERNAME} </option>
                            ))
                        }
                            </select>
                        </label>
                        <label htmlFor="" style={{ marginLeft: '2%' }}>Buyer
                            <select name="Buyer" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '3px', width: '144px' }}
                            value={selectedBuyer}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            buyers.map((record,index) =>(
                                <option key={index} value={record.PRIMENAME} >{record.PRIMENAME} </option>
                            ))
                        }
                            </select>
                        </label>
                        <label htmlFor="" style={{ marginLeft: '2%' }}>Season
                            <select name="Season" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '3px', width: '144px' }}
                            value={selectedSeason}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            seasons.map((record,index) =>(
                                <option key={index} value={record.PRIMENAME} >{record.PRIMENAME} </option>
                            ))
                        }
                            </select>
                        </label>



                    </tr>

                    <tr style={{ display: 'flex', flexDirection: 'row' }}>

                        <label htmlFor="" style={{ marginLeft: '2%' }}>Company
                            <select name="Company" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '4px', width: '144px', marginTop: '10px' }}
                            value={selectedCompany}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            company.map((record,index) =>(
                                <option key={index} value={record.PRIMENAME} >{record.PRIMENAME} </option>
                            ))
                        }
                            </select>
                        </label>

                        <label htmlFor="" style={{ marginLeft: '0px' }}>Packing
                            <select name="Packing" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '13px', width: '144px' }}
                            value={selectedPacking}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            sections.map((record,index) =>(
                                <option key={index} value={record.PRIMENAME} >{record.PRIMENAME} </option>
                            ))
                        }
                            </select>
                        </label>


                        <label htmlFor="" style={{ marginLeft: '2%' }}>Section
                            <select name="Section" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '3px', width: '144px' }}
                            value={selectedSection}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            sections.map((record,index) =>(
                                <option key={index} value={record.PRIMENAME} >{record.PRIMENAME} </option>
                            ))
                        }
                            </select>
                        </label>
                        <label htmlFor="" style={{ marginLeft: '2%' }}>Group
                            <select name="Group" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '3px', width: '144px' }}
                            value={selectedGroup}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            initialRecords.map((record,index) =>(
                                <option key={index} value={record.I_GROUP} >{record.I_GROUP} </option>
                            ))
                        }
                            </select>
                        </label>

                        <label htmlFor="" style={{ marginLeft: '2%' }}>Barcode
                            <input type="text" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '17px', width: '144px' }} />
                        </label>


                    </tr>

                    <tr style={{ display: 'flex', flexDirection: 'row' }}>

                        <label htmlFor="" style={{ marginLeft: '2%' }}>Sub Group
                            <select name="Sub-Group" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '4px', width: '144px', marginTop: '10px' }}
                            value={selectedSubGroup}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            initialRecords.map((record,index) =>(
                                <option key={index} value={record.SUBGROUP} >{record.SUBGROUP} </option>
                            ))
                        }
                            </select>
                        </label>

                        <label htmlFor="" style={{ marginLeft: '0px' }}>Category
                            <select name="Category" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '13px', width: '144px' }}
                            value={selectedCategory}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            category.map((record,index) =>(
                                <option key={index} value={record.PRIMENAME} >{record.PRIMENAME} </option>
                            ))
                        }
                            </select>
                        </label>


                        <label htmlFor="" style={{ marginLeft: '2%' }}>Sub Category
                            <select name="Sub-Category" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '3px', width: '144px' }}
                            value={selectedSubCategory}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            initialRecords.map((record,index) =>(
                                <option key={index} value={record.SUBCATEGORY} >{record.SUBCATEGORY} </option>
                            ))
                        }
                            </select>
                        </label>
                        <label htmlFor="" style={{ marginLeft: '2%' }}>Unit
                            <select name="Unit" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '3px', width: '144px' }}
                            value={selectedUnit}
                            onChange={handleDropdownChange}
                            >
                                <option value="">--ALL--</option>
                                {
                            initialRecords.map((record,index) =>(
                                <option key={index} value={record.UNIT} >{record.UNIT} </option>
                            ))
                        }
                            </select>
                        </label>

                        <label htmlFor="status" style={{ marginLeft: '2%' }}>Status
        <select name="Status" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '10px', width: '144px', marginTop: '10px' }} onChange={handleDropdownChange}>
          <option value="">--ALL--</option>
          {statuses.map((record, index) => (
            <option key={index} value={record.PRIMENAME}>{record.PRIMENAME}</option>
          ))}
        </select>
      </label>
                    </tr>
                </table>

                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        style={{
                            position: "relative",
                            zIndex: 0
                        }}
                        columns={[
                            { accessor: 'id', title: '#', sortable: true, hidden: hideCols.includes('id') },
                            { accessor: 'ITEMNAME', title: 'Item Name', sortable: true, hidden: hideCols.includes('ITEMNAME') },
                            { accessor: 'ITEMTYPE', title: 'Item Type', sortable: true, hidden: hideCols.includes('ITEMTYPE') },
                            { accessor: 'BARCODE', title: 'Barcode', sortable: true, hidden: hideCols.includes('BARCODE') },
                            { accessor: 'BOXSIZE', title: 'Box Size', sortable: true, hidden: hideCols.includes('BOXSIZE') },
                            { accessor: 'BRAND', title: 'Brand', sortable: true, hidden: hideCols.includes('BRAND') },
                            { accessor: 'BUYER', title: 'Buyer', sortable: true, hidden: hideCols.includes('BUYER') },
                            { accessor: 'CATEGORY', title: 'Category', sortable: true, hidden: hideCols.includes('CATEGORY') },
                            { accessor: 'CESS', title: 'Cess', sortable: true, hidden: hideCols.includes('CESS') },
                            { accessor: 'COMPANY', title: 'Company', sortable: true, hidden: hideCols.includes('COMPANY') },
                            { accessor: 'COLOR', title: 'Color', sortable: true, hidden: hideCols.includes('COLOR') },
                            { accessor: 'COMPANYID', title: 'Company ID', sortable: true, hidden: hideCols.includes('COMPANYID') },
                            { accessor: 'CUSTOME', title: 'Custome', sortable: true, hidden: hideCols.includes('CUSTOME') },
                            { accessor: 'DEALERCODE', title: 'Dealer Code', sortable: true, hidden: hideCols.includes('DEALERCODE') },
                            { accessor: 'DEALERNAME', title: 'Dealer Name', sortable: true, hidden: hideCols.includes('DEALERNAME') },
                            { accessor: 'DEALERID', title: 'Dealer ID', sortable: true, hidden: hideCols.includes('DEALERID') },
                            { accessor: 'DISCOUNT', title: 'Discount', sortable: true, hidden: hideCols.includes('DISCOUNT') },
                            { accessor: 'ESAMOUNT', title: 'ES Amount', sortable: true, hidden: hideCols.includes('ESAMOUNT') },
                            { accessor: 'ESID', title: 'ES ID', sortable: true, hidden: hideCols.includes('ESID') },
                            { accessor: 'ESTAG', title: 'ES Tag', sortable: true, hidden: hideCols.includes('ESTAG') },
                            { accessor: 'EXPIRYDAYS', title: 'Expiry Days', sortable: true, hidden: hideCols.includes('EXPIRYDAYS') },
                            { accessor: 'FLAG', title: 'Flag', sortable: true, hidden: hideCols.includes('FLAG') },
                            { accessor: 'GENDER', title: 'Gender', sortable: true, hidden: hideCols.includes('GENDER') },
                            { accessor: 'HSNCODE', title: 'HSN Code', sortable: true, hidden: hideCols.includes('HSNCODE') },
                            { accessor: 'ITEMID', title: 'Item ID', sortable: true, hidden: hideCols.includes('ITEMID') },
                            { accessor: 'ITEMNAME', title: 'Item Name', sortable: true, hidden: hideCols.includes('ITEMNAME') },
                            { accessor: 'ITEMTYPE', title: 'Item Type', sortable: true, hidden: hideCols.includes('ITEMTYPE') },
                            { accessor: 'I_GROUP', title: 'Group', sortable: true, hidden: hideCols.includes('I_GROUP') },
                            { accessor: 'I_SIZE', title: 'Size', sortable: true, hidden: hideCols.includes('I_SIZE') },
                            { accessor: 'LOOKUP', title: 'Lookup', sortable: true, hidden: hideCols.includes('LOOKUP') },
                            { accessor: 'MARGIN', title: 'Margin', sortable: true, hidden: hideCols.includes('MARGIN') },
                            { accessor: 'MARKDOWN', title: 'Markdown', sortable: true, hidden: hideCols.includes('MARKDOWN') },
                            { accessor: 'MARKUP', title: 'Markup', sortable: true, hidden: hideCols.includes('MARKUP') },
                            { accessor: 'MATERIAL', title: 'Material', sortable: true, hidden: hideCols.includes('MATERIAL') },
                            { accessor: 'MAXQTY', title: 'Max Quantity', sortable: true, hidden: hideCols.includes('MAXQTY') },
                            { accessor: 'MINQTY', title: 'Min Quantity', sortable: true, hidden: hideCols.includes('MINQTY') },
                            { accessor: 'MORP', title: 'MORP', sortable: true, hidden: hideCols.includes('MORP') },
                            { accessor: 'MRP', title: 'MRP', sortable: true, hidden: hideCols.includes('MRP') },
                            { accessor: 'OMRP', title: 'OMRP', sortable: true, hidden: hideCols.includes('OMRP') },
                            { accessor: 'OTAX', title: 'OTAX', sortable: true, hidden: hideCols.includes('OTAX') },
                            { accessor: 'PACKING', title: 'Packing', sortable: true, hidden: hideCols.includes('PACKING') },
                            { accessor: 'PHOTO', title: 'Photo', sortable: true, hidden: hideCols.includes('PHOTO') },
                            { accessor: 'PRODUCT', title: 'Product', sortable: true, hidden: hideCols.includes('PRODUCT') },
                            { accessor: 'PURPRICE', title: 'Purchase Price', sortable: true, hidden: hideCols.includes('PURPRICE') },
                            { accessor: 'RATE', title: 'Rate', sortable: true, hidden: hideCols.includes('RATE') },
                            { accessor: 'REMARK', title: 'Remark', sortable: true, hidden: hideCols.includes('REMARK') },
                            { accessor: 'REORDERQTY', title: 'Reorder Quantity', sortable: true, hidden: hideCols.includes('REORDERQTY') },
                            { accessor: 'SALEPRICE', title: 'Sale Price', sortable: true, hidden: hideCols.includes('SALEPRICE') },
                            { accessor: 'SCOLOR', title: 'Color', sortable: true, hidden: hideCols.includes('SCOLOR') },
                            { accessor: 'SEASON', title: 'Season', sortable: true, hidden: hideCols.includes('SEASON') },
                            { accessor: 'SECTION', title: 'Section', sortable: true, hidden: hideCols.includes('SECTION') },
                            { accessor: 'SHELFNO', title: 'Shelf No', sortable: true, hidden: hideCols.includes('SHELFNO') },
                            { accessor: 'SP1', title: 'SP1', sortable: true, hidden: hideCols.includes('SP1') },
                            { accessor: 'SP2', title: 'SP2', sortable: true, hidden: hideCols.includes('SP2') },
                            { accessor: 'SP3', title: 'SP3', sortable: true, hidden: hideCols.includes('SP3') },
                            { accessor: 'SP4', title: 'SP4', sortable: true, hidden: hideCols.includes('SP4') },
                            { accessor: 'STATUS', title: 'Status', sortable: true, hidden: hideCols.includes('STATUS') },
                            { accessor: 'STYLE', title: 'Style', sortable: true, hidden: hideCols.includes('STYLE') },
                            { accessor: 'SUBCATEGORY', title: 'Subcategory', sortable: true, hidden: hideCols.includes('SUBCATEGORY') },
                            { accessor: 'SUBGROUP', title: 'Subgroup', sortable: true, hidden: hideCols.includes('SUBGROUP') },
                            { accessor: 'SUP_COLOR', title: 'Supplier Color', sortable: true, hidden: hideCols.includes('SUP_COLOR') },
                            { accessor: 'TAX', title: 'Tax', sortable: true, hidden: hideCols.includes('TAX') },
                            { accessor: 'UNIT', title: 'Unit', sortable: true, hidden: hideCols.includes('UNIT') },
                            { accessor: 'UPDATEDBY', title: 'Updated By', sortable: true, hidden: hideCols.includes('UPDATEDBY') },
                            { accessor: 'UPDATEDON', title: 'Updated On', sortable: true, hidden: hideCols.includes('UPDATEDON') },
                            { accessor: 'WSP', title: 'WSP', sortable: true, hidden: hideCols.includes('WSP') }

                        ]}
                        // totalRecords={initialRecords.length}
                        totalRecords={totalRecords}
                        recordsPerPage={pageSize}
                        page={currentPage}
                        onPageChange={(p) => setCurrentPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}

                    />
                </div>
            </div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                {/* <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <IconBell />
                </div> */}
                {/* <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
                <a href="https://www.npmjs.com/package/mantine-datatable" target="_blank" className="block hover:underline">
                    https://www.npmjs.com/package/mantine-datatable
                </a> */}
            </div>
        </div>
    );
};

export default Items;