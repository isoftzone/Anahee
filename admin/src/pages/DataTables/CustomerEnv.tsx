import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { BASE_URL } from '../../config'
import axios, { AxiosResponse } from 'axios';


const CustomerEnv = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Order Sorting Table'));
    });

    const col = ['id','ACCOUNTNO','ACCOUNTTYPE','AGENT','AGENTCOMISSION','AGENTID','ANNIVERSARY','AREA','BALANCE','BANKNAME','BRANCHNAME','CADDRESSLINE1', 'CADDRESSLINE2', 'CADDRESSLINE3','CARDNO','CCITY','CCOUNTRY','CDISTRICT','CEMAILID','CHEQUENO','CHEQUEREMARK','CITY','CLUB','CMOBILE','CUSTOMERID','DISCOUNT','DELAYDAYS','DOB','FIRMNAME', 'GSTIN', 'IFSCCODE', 'LRSMS', 'MARITALSTATUS', 'MICRCODE', 'MOBILE2', 'NAME', 'NAME2', 'PADDRESSLINE1', 'PADDRESSLINE2', 'PADDRESSLINE3', 'PAMOUNT', 'PCITY', 'PCOUNTRY', 'PDISTRICT', 'PEARNED', 'PEMAILID','PMOBILE', 'PPINCODE', 'PREDEEMED', 'PSTATE', 'RCONTACTNO', 'REMARK', 'RNAME', 'SALEPRICE', 'STATE', 'STATECODE', 'STATUS', 'TAMOUNT', 'TELEPHONE', 'TELEPHONE1', 'TELEPHONE2', 'TINNO', 'TITLE', 'TPNOBANK', 'TRANSPORT', 'TYPE', 'UPDATEDBY', 'UPDATEDON',
    ];
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    // const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [search, setSearch] = useState('');
    const [clientdata,setClientData]=useState(''); 
    const [initialRecords, setInitialRecords] = useState<UserData[]>([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [tempData, setTempData] = useState(initialRecords);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedFirm, setSelectedFirm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1); // Explicitly specify type as number
    const [totalPages, setTotalPages] = useState<number>(1); // Explicitly specify type as number
    const [pageSize, setPageSize] = useState<number>(10); // Explicitly specify type as number
    const [totalRecords, setTotalRecords] = useState<number>(0);



    const [hideCols, setHideCols] = useState<any>(['ACCOUNTNO','ACCOUNTTYPE','AGENT','AGENTCOMISSION','AGENTID','ANNIVERSARY','AREA','BALANCE','BANKNAME','BRANCHNAME','CADDRESSLINE1', 'CADDRESSLINE2', 'CADDRESSLINE3','CARDNO','CCITY','CCOUNTRY','CDISTRICT','CEMAILID','CHEQUENO','CHEQUEREMARK','CITY','CLUB','CMOBILE','CUSTOMERID','DISCOUNT','DELAYDAYS','DOB','FIRMNAME', 'GSTIN', 'IFSCCODE', 'LRSMS', 'MARITALSTATUS', 'MICRCODE', 'MOBILE2', 'NAME', 'NAME2', 'PADDRESSLINE1', 'PADDRESSLINE2', 'PADDRESSLINE3', 'PAMOUNT', 'PCITY', 'PCOUNTRY', 'PDISTRICT', 'PEARNED', 'PEMAILID','PMOBILE', 'PPINCODE', 'PREDEEMED', 'PSTATE', 'RCONTACTNO', 'REMARK', 'RNAME', 'SALEPRICE', 'STATE', 'STATECODE', 'STATUS', 'TAMOUNT', 'TELEPHONE', 'TELEPHONE1', 'TELEPHONE2', 'TINNO', 'TITLE', 'TPNOBANK', 'TRANSPORT', 'TYPE', 'UPDATEDBY', 'UPDATEDON', ]
  );




    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    interface UserData {
        ACCOUNTHOLDERNAME:"string";
ACCOUNTNO:"string";
ACCOUNTTYPE:"string";
ADDRESS:"string";
AGENT:"string";
AGENTCOMISSION:number;
AGENTID:number;
ANNIVERSARY:"string";
AREA:"string";
BALANCE:number;
BANKNAME:"string";
BRANCHNAME:"string";
CADDRESSLINE1:"string";
CADDRESSLINE2:"string";
CADDRESSLINE3:"string";
CARDNO:"string";
CCITY:"string";
CCOUNTRY:"string";
CDISTRICT:"string";
CEMAILID:"string";
CHEQUENO:"string";
CHEQUEREMARK:"string";
CITY:"string";
CLUB:number;
CMOBILE:"string";
COMPANYID:number;
CONSIGNEEID:number;
COUNTRY:"string";
CPINCODE:"string";
CREATEDBY:"string";
CREATEDON:"string";
CREDITLIMITS:"string";
CSTATE:"string";
CUSTOMERCODE:"string";
CUSTOMERID:number;
DELAYDAYS:"string";
DISCOUNT:"string";
DOB:"string";
EMAILID:"string";
FIRMNAME:"string";
FNAME:"string";
GSTIN:"string";
IFSCCODE:"string";
LNAME:"string";
LRSMS:"string";
MARITALSTATUS:"string";
MICRCODE:"string";
MOBILE:"string";
MOBILE2:"string";
NAME:"string";
NAME2:"string";
PADDRESSLINE1:"string";
PADDRESSLINE2:"string";
PADDRESSLINE3:"string";
PAMOUNT:number;
PCITY:"string";
PCOUNTRY:"string";
PDISTRICT:"string";
PEARNED:number;
PEMAILID:"string";
PMOBILE:"string";
PPINCODE:"string";
PREDEEMED:number;
PSTATE:"string";
RCONTACTNO:"string";
REMARK:"string";
RNAME:"string";
SALEPRICE:"string";
STATE:"string";
STATECODE:"string";
STATUS:"string";
TAMOUNT:number;
TELEPHONE:"string";
TELEPHONE1:"string";
TELEPHONE2:"string";
TINNO:"string";
TITLE:"string";
TPNOBANK:"string";
TRANSPORT:"string";
TYPE:"string";
UPDATEDBY:"string";
UPDATEDON:"string";
id:number;
    }

    const cols = [ 

            { accessor: 'ACCOUNTNO', title: 'ACCOUNTNO'},
            { accessor: 'ACCOUNTTYPE', title: 'ACCOUNTTYPE' },
            { accessor: 'ADDRESS', title: 'ADDRESS' },
            { accessor: 'AGENT', title: 'AGENT' },
            { accessor: 'AGENTCOMISSION', title: 'AGENTCOMISSION' },
            { accessor: 'AGENTID', title: 'AGENTID' },
            { accessor: 'ANNIVERSARY', title: 'ANNIVERSARY' },
            { accessor: 'AREA', title: 'AREA' },
            { accessor: 'BALANCE', title: 'BALANCE' },
            { accessor: 'BANKNAME', title: 'BANKNAME' },
            { accessor: 'BRANCHNMAE', title: 'BRANCHNMAE' },
            { accessor: 'CADDRESSLINE1', title: 'CADDRESSLINE1' },
            { accessor: 'CADDRESSLINE2.', title: 'CADDRESSLINE2.' },
            { accessor: 'CADDRESSLINE3', title: 'CADDRESSLINE3' },
            { accessor: 'CARDNO', title: 'CARDNO' },
            { accessor: 'CCITY', title: 'CCITY' },
            { accessor: 'CCOUNTRY', title: 'CCOUNTRY' },
            { accessor: 'CDISTRICT', title: 'CDISTRICT' },
            { accessor: 'CEMAILID', title: 'CEMAILID' },
            { accessor: 'CHEQUENO', title: 'CHEQUENO' },
            { accessor: 'CHEQUEREMARK', title: 'CHEQUEREMARK' },
            { accessor: 'CITY', title: 'CITY' },
            { accessor: 'CLUB', title: 'CLUB' },
            { accessor: 'CMOBILE', title: 'CMOBILE' },
            { accessor: 'COMPANYID', title: 'COMPANYID'},
        { accessor: 'CUSTOMERID', title: 'CUSTOMERID' },
        { accessor: 'DELAYDAYS', title: 'DELAYDAYS' },
        { accessor: 'DISCOUNT', title: 'DISCOUNT' },
        { accessor: 'DOB', title: 'DOB' },
            { accessor: 'EMAILID', title: 'EMAILID' },
            { accessor: 'FIRMNAME', title: 'FIRMNAME' },
            { accessor: 'FNAME', title: 'FNAME' },
            { accessor: 'GSTIN', title: 'GSTIN' },
            { accessor: 'IFSCCODE', title: 'IFSCCODE' },
            { accessor: 'LNMAE', title: 'LNMAE' },
            { accessor: 'LRSMS', title: 'LRSMS' },
            { accessor: 'MARITALSTATUS', title: 'MARITALSTATUS' },
            { accessor: 'MICRCODE', title: 'MICRCODE' },
            { accessor: 'MOBILE', title: 'MOBILE' },
            { accessor: 'MOBILE2', title: 'MOBILE2' },
            { accessor: 'NAME', title: 'NAME' },
            { accessor: 'NAME2', title: 'NAME2' },
            { accessor: 'PADDRESSLINE1', title: 'PADDRESSLINE1' },
            { accessor: 'PADDRESSLINE2', title: 'PADDRESSLINE2' },
            { accessor: 'PADDRESSLINE3', title: 'PADDRESSLINE3' },
            { accessor: 'PAMOUNT', title: 'PAMOUNT' },
            { accessor: 'PCITY', title: 'PCITY' },
            { accessor: 'PCOUNTRY', title: 'PCOUNTRY' },
            { accessor: 'PDISTRICT', title: 'PDISTRICT' },
            { accessor: 'PEARNED', title: 'PEARNED' },
            { accessor: 'PEMAILID', title: 'PEMAILID' },

            { accessor: 'PMOBILE', title: 'PMOBILE' },
            { accessor: 'PPINCODE', title: 'PPINCODE' },
            { accessor: 'PREDEEMED', title: 'PREDEEMED' },
            { accessor: 'PSTATE', title: 'PSTATE' },
            { accessor: 'RCONTACTNO', title: 'RCONTACTNO' },
            { accessor: 'REMARK', title: 'REMARK' },
            { accessor: 'RNAME', title: 'RNAME' },
            { accessor: 'SALEPRICE', title: 'SALEPRICE' },
            { accessor: 'STATE', title: 'STATE' },
            { accessor: 'STATECODE', title: 'STATECODE' },
            { accessor: 'STATUS', title: 'STATUS' },
            { accessor: 'TAMOUNT', title: 'TAMOUNT' },
            { accessor: 'TELEPHONE', title: 'TELEPHONE' },
            { accessor: 'TELEPHONE1', title: 'TELEPHONE1' },
            { accessor: 'TELEPHONE2', title: 'TELEPHONE2' },
            { accessor: 'TINNO', title: 'TINNO' },
            { accessor: 'TITLE', title: 'TITLE' },
            { accessor: 'TPNOBANK', title: 'TPNOBANK' },
            { accessor: 'TRANSPORT', title: 'TRANSPORT' },
            { accessor: 'TYPE', title: 'TYPE' },
            { accessor: 'UPDATEDBY', title: 'UPDATEDBY' },
            { accessor: 'UPDATEDON', title: 'UPDATEDON' },
            { accessor: 'ID', title: 'ID' }

    ];
    useEffect(() => {
        // Fetch data from API
        
        fetch(`${BASE_URL}/getCustomer`)
            .then(response => response.json())
            .then(data => {
                let detail=data;
                setClientData(detail);
                setInitialRecords(detail);
                setRecordsData(detail);
                setTempData(detail);
      })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

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
        setInitialRecords(() => {
            return tempData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.FNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.CITY.toLowerCase().includes(search.toLowerCase()) ||
                    // item.company.toLowerCase().includes(search.toLowerCase()) ||
                    item.EMAILID.toLowerCase().includes(search.toLowerCase()) ||
                    // item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.DOB.toLowerCase().includes(search.toLowerCase()) ||
                    item.MOBILE.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    const [minAge, setMinAge] = useState<any>('');
    const [maxAge, setMaxAge] = useState<any>('');

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
    const header = ['Id','ACCOUNTNO','ACCOUNTTYPE','AGENT','AGENTCOMISSION','AGENTID','ANNIVERSARY','AREA','BALANCE','BANKNAME','BRANCHNAME','CADDRESSLINE1', 'CADDRESSLINE2', 'CADDRESSLINE3','CARDNO','CCITY','CCOUNTRY','CDISTRICT','CEMAILID','CHEQUENO','CHEQUEREMARK','CITY','CLUB','CMOBILE','CUSTOMERID','DISCOUNT','DELAYDAYS','DOB','FIRMNAME', 'GSTIN', 'IFSCCODE', 'LRSMS', 'MARITALSTATUS', 'MICRCODE', 'MOBILE2', 'NAME', 'NAME2', 'PADDRESSLINE1', 'PADDRESSLINE2', 'PADDRESSLINE3', 'PAMOUNT', 'PCITY', 'PCOUNTRY', 'PDISTRICT', 'PEARNED', 'PEMAILID','PMOBILE', 'PPINCODE', 'PREDEEMED', 'PSTATE', 'RCONTACTNO', 'REMARK', 'RNAME', 'SALEPRICE', 'STATE', 'STATECODE', 'STATUS', 'TAMOUNT', 'TELEPHONE', 'TELEPHONE1', 'TELEPHONE2', 'TINNO', 'TITLE', 'TPNOBANK', 'TRANSPORT', 'TYPE', 'UPDATEDBY', 'UPDATEDON', ];
    
    interface YourDataType {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        dob: string;
        phone: string;
        age: number;
        company: string;
    }
    function handleDownloadExcel() {
        const col: Array<keyof UserData> = ['id','ACCOUNTNO','ACCOUNTTYPE','AGENT','AGENTCOMISSION','AGENTID','ANNIVERSARY','AREA','BALANCE','BANKNAME','BRANCHNAME','CADDRESSLINE1', 'CADDRESSLINE2', 'CADDRESSLINE3','CARDNO','CCITY','CCOUNTRY','CDISTRICT','CEMAILID','CHEQUENO','CHEQUEREMARK','CITY','CLUB','CMOBILE','CUSTOMERID','DISCOUNT','DELAYDAYS','DOB','FIRMNAME', 'GSTIN', 'IFSCCODE', 'LRSMS', 'MARITALSTATUS', 'MICRCODE', 'MOBILE2', 'NAME', 'NAME2', 'PADDRESSLINE1', 'PADDRESSLINE2', 'PADDRESSLINE3', 'PAMOUNT', 'PCITY', 'PCOUNTRY', 'PDISTRICT', 'PEARNED', 'PEMAILID','PMOBILE', 'PPINCODE', 'PREDEEMED', 'PSTATE', 'RCONTACTNO', 'REMARK', 'RNAME', 'SALEPRICE', 'STATE', 'STATECODE', 'STATUS', 'TAMOUNT', 'TELEPHONE', 'TELEPHONE1', 'TELEPHONE2', 'TINNO', 'TITLE', 'TPNOBANK', 'TRANSPORT', 'TYPE', 'UPDATEDBY', 'UPDATEDON',];   
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: recordsData.map(row => col.map(key => row[key]))
            },
        });
    };

    const exportTable = (type: any) => {
        let columns: any = col;
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

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'Customer Name') {
            setSelectedCustomer(value);
        } else if (name === 'Firm Name') {
            setSelectedFirm(value);
        }else if (name === 'City'){
            setSelectedCity(value);
        }else if (name === 'State'){
            setSelectedState(value);
        }else if (name === 'Status'){
            setSelectedStatus(value);
        }
    }
    const handleSearch = () => {
        const filteredData = initialRecords.filter(record => {
            return (selectedCustomer === "" || record.FNAME === selectedCustomer) && 
                   (selectedFirm === "" || record.FIRMNAME === selectedFirm) &&
                   (selectedCity === "" || record.CITY === selectedCity) &&
                   (selectedState === "" || record.STATE === selectedState) &&
                   (selectedStatus === "" || record.STATUS === selectedStatus);
        });
        setRecordsData(filteredData);
    }

    const handleReset = () => {
        setSelectedCustomer("");
        setSelectedFirm("");
        setSelectedCity("");
        setSelectedState("");
        setSelectedStatus("");
        setRecordsData(initialRecords.slice(0, 10));   
    }


    return (
        <div>
            <div className="panel mt-6">
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-5">
                        {/* <div className="md:flex-auto flex-1">
                            <input
                                type="text"
                                value={minAge}
                                onChange={(e) => {
                                    setMinAge(e.target.value);
                                }}
                                className="form-input"
                                placeholder="Minimum age..."
                            />
                        </div>
                        <div className="md:flex-auto flex-1">
                            <input
                                type="text"
                                value={maxAge}
                                onChange={(e) => {
                                    setMaxAge(e.target.value);
                                }}
                                className="form-input"
                                placeholder="Maximum age..."
                            />
                        </div> */}
                        <div className="flex items-center flex-wrap">
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

                        <button type="button" className="btn btn-primary btn-sm m-1 w-50 h-5 ltr:mr-2 rtl:ml-2"
                        style={{
                            width: "11%",
                            height: "34px"
                        }}
                        onClick={handleReset}
                    >
                        RESET
                    </button>

                        <button type="button" className="btn btn-primary btn-sm m-1" style={{ padding: '8px 20px' }}
                        onClick={handleSearch}>
                             SEARCH
                            </button>

                            {/* <button type="button" className="btn btn-primary btn-sm m-1" style={{ padding: '8px 28px' }}>

                                CLOSE
                            </button> */}
                    </div>
                    
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
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div>
                <table>
        <tr>
            <td>
                <label htmlFor="">Customer Name
                    <select name="Customer Name" style={{border:'1px solid #e5e7eb',borderRadius:'5px', margin:'0px 6px', width:'144px'}}
                    value={selectedCustomer}
                    onChange={handleDropdownChange}        
                   >
                        <option value="">--ALL--</option>
                        {
                           initialRecords.map((record,index) =>(
                                <option key={index} value={record.FNAME} >{record.FNAME} </option>
                            ))
                        }
                    </select>
                </label>
            </td>
            <td>
                <label htmlFor="">Firm Name
                    <select name="Firm Name" style={{border:'1px solid #e5e7eb',borderRadius:'5px', margin:'0px 6px', width:'144px'}}
                    value={selectedFirm}
                    onChange={handleDropdownChange}  
                      >
                        <option value="">--ALL--</option>
                        {
                            initialRecords.map((record,index) =>(
                                <option key={index} value={record.FIRMNAME} >{record.FIRMNAME} </option>
                            ))
                        }

                    </select>
                </label>
            </td>
            <td>
                <label htmlFor="">Mobile No.
                <input type="text" style={{border:'1px solid #e5e7eb',borderRadius:'5px', margin:'0px 6px', width:'144px'}}/>
                
                </label>
            </td>
            {/* <td>
            <input className="btn btn-primary" type="button" value="Ok"/>
            </td> */}
        </tr>
        <tr>
            <td>
                <label htmlFor="">City
                <select name="City" style={{border:'1px solid #e5e7eb',borderRadius:'5px', marginLeft:'84px', width:'144px'}}
                value={selectedCity}
                        onChange={handleDropdownChange}
                             >
                        <option value="">--ALL--</option>
                        {
                        initialRecords.map((record,index) =>(
                                <option key={index} value={record.CITY} >{record.CITY} </option>
                            ))
                        }
                    </select>
               </label>
            </td>
            <td>
                <label htmlFor="">State
                <select name="State" style={{border:'1px solid #e5e7eb',borderRadius:'5px', marginLeft:'41px', width:'144px'}}
                value={selectedState}
                        onChange={handleDropdownChange}
                             >
                              
                                    <option value="">--ALL--</option>
                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.STATE}>{record.STATE}</option>
                                    ))}
                                    </select>
                                    
                </label>
            </td>
            <td>
                {/* <label htmlFor="">Status
                    <select name="Status" style={{border:'1px solid #e5e7eb',borderRadius:'5px', marginLeft:'32px', width:'144px'}}
                     value={selectedStatus}
                     onChange={handleDropdownChange}
                    >
                   
                                    <option value="">--All--</option>
                                    {initialRecords.map((record, index) => (
                                        <option key={index} value={record.STATUS}>{record.STATUS}</option>
                                    ))}
                                </select>
                </label> */}
                    <label htmlFor="" style={{ marginLeft: '2%' }}>GST No.
        <input type="text" style={{ border: '1px solid black', borderRadius: '5px', marginLeft: '17px', width:'144px' }} />
    </label>
            </td> 
            {/* <td>
            <input className="btn btn-primary" type="button" value="Close"/>
            </td> */}
            
        </tr>
    </table>
                </div>

                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'id', sortable: true, hidden: hideCols.includes('id') },
                            { accessor: 'FNAME', title: 'FNAME', sortable: true, hidden: hideCols.includes('FNAME') },
                            { accessor: 'LNAME', title: 'LNAME', sortable: true, hidden: hideCols.includes('LNAME') },
                            { accessor: 'EMAILID', title: 'EMAILID', sortable: true, hidden: hideCols.includes('EMAILID') },
                            { accessor: 'ACCOUNTNO', title: 'ACCOUNTNO', sortable: true, hidden: hideCols.includes('ACCOUNTNO') },
                            { accessor: 'ACCOUNTTYPE', title: 'ACCOUNTTYPE', sortable: true, hidden: hideCols.includes('ACCOUNTTYPE') },
                            { accessor: 'ADDRESS', title: 'ADDRESS', sortable: true, hidden: hideCols.includes('ADDRESS')},
                            {  accessor: 'AGENT',title: 'Agent',sortable: true, hidden: hideCols.includes('AGENT')},
                            { accessor: 'AGENTID',  title: 'Agent Id',  sortable: true, hidden: hideCols.includes('AGENTID')},
                            { accessor: 'AGENTCOMISSION',title: 'AgentComission', sortable: true, hidden: hideCols.includes('AGENTCOMISSION')},
                            { accessor: 'ANNIVERSARY',title: 'ANNIVERSARY',sortable: true, hidden: hideCols.includes('ANNIVERSARY') },
                            { accessor: 'AREA',title: 'AREA',sortable: true, hidden: hideCols.includes('AREA') },
                            { accessor: 'BALANCE',title: 'BALANCE',sortable: true, hidden: hideCols.includes('BALANCE') },
                            { accessor: 'BANKNAME',title: 'BANKNAME',sortable: true, hidden: hideCols.includes('BANKNAME') },
                            { accessor: 'BRANCHNAME', title: 'BRANCHNAME', sortable: true, hidden: hideCols.includes('BRANCHNAME') },
                            { accessor: 'CADDRESSLINE1', title: 'CADDRESSLINE1', sortable: true, hidden: hideCols.includes('CADDRESSLINE1') },
                            { accessor: 'CADDRESSLINE2',title: 'CADDRESSLINE2',sortable: true, hidden: hideCols.includes('CADDRESSLINE2') },
                            { accessor: 'CADDRESSLINE3',title: 'CADDRESSLINE3',sortable: true, hidden: hideCols.includes('CADDRESSLINE3') },
                            { accessor: 'CARDNO', title: 'CARDNO', sortable: true, hidden: hideCols.includes('CARDNO') },
                            { accessor: 'CCITY',title: 'CCITY',sortable: true, hidden: hideCols.includes('CCITY') },
                            { accessor: 'CCOUNTRY',title: 'CCOUNTRY',sortable: true, hidden: hideCols.includes('CCOUNTRY') },
                            { accessor: 'CDISTRICT', title: 'CDISTRICT', sortable: true, hidden: hideCols.includes('CDISTRICT') },
                            { accessor: 'CEMAILID', title: 'CEMAILID', sortable: true, hidden: hideCols.includes('CEMAILID') },
                            { accessor: 'CHEQUENO',title: 'CHEQUENO',sortable: true, hidden: hideCols.includes('CHEQUENO') },
                            { accessor: 'CHEQUEREMARK',title: 'CHEQUEREMARK',sortable: true, hidden: hideCols.includes('CHEQUEREMARK') },
                            { accessor: 'CITY', title: 'CITY', sortable: true, hidden: hideCols.includes('CITY') },
                            { accessor: 'CLUB', title: 'CLUB', sortable: true, hidden: hideCols.includes('CLUB') },
                            { accessor: 'CMOBILE', title: 'CMOBILE', sortable: true, hidden: hideCols.includes('CMOBILE') },
                            { accessor: 'COMPANYID',title: 'COMPANYID',sortable: true, hidden: hideCols.includes('COMPANYID') },
                            { accessor: 'CUSTOMERID',title: 'CUSTOMERID',sortable: true, hidden: hideCols.includes('CUSTOMERID') },
                            { accessor: 'DELAYDAYS',title: 'DELAYDAYS',sortable: true, hidden: hideCols.includes('DELAYDAYS') },
                            { accessor: 'DISCOUNT',title: 'DISCOUNT',sortable: true, hidden: hideCols.includes('DISCOUNT') },
                            { accessor: 'DOB',title: 'DOB',sortable: true, hidden: hideCols.includes('DOB') },
                            { accessor: 'FIRMNAME', title: 'FIRMNAME', sortable: true, hidden: hideCols.includes('FIRMNAME') },
                                { accessor: 'GSTIN', title: 'GSTIN', sortable: true, hidden: hideCols.includes('GSTIN') },
                                { accessor: 'IFSCCODE', title: 'IFSCCODE', sortable: true, hidden: hideCols.includes('IFSCCODE') },
                                { accessor: 'LRSMS', title: 'LRSMS', sortable: true, hidden: hideCols.includes('LRSMS') },
                                { accessor: 'MARITALSTATUS', title: 'MARITALSTATUS', sortable: true, hidden: hideCols.includes('MARITALSTATUS') },
                                { accessor: 'MICRCODE', title: 'MICRCODE', sortable: true, hidden: hideCols.includes('MICRCODE') },
                                { accessor: 'MOBILE', title: 'MOBILE', sortable: true, hidden: hideCols.includes('MOBILE') },
                                { accessor: 'MOBILE2', title: 'MOBILE2', sortable: true, hidden: hideCols.includes('MOBILE2') },
                                { accessor: 'NAME', title: 'NAME', sortable: true, hidden: hideCols.includes('NAME') },
                                { accessor: 'NAME2', title: 'NAME2', sortable: true, hidden: hideCols.includes('NAME2') },
                                { accessor: 'PADDRESSLINE1', title: 'PADDRESSLINE1', sortable: true, hidden: hideCols.includes('PADDRESSLINE1') },
                                { accessor: 'PADDRESSLINE2', title: 'PADDRESSLINE2', sortable: true, hidden: hideCols.includes('PADDRESSLINE2') },
                                { accessor: 'PADDRESSLINE3', title: 'PADDRESSLINE3', sortable: true, hidden: hideCols.includes('PADDRESSLINE3') },
                                { accessor: 'PAMOUNT', title: 'PAMOUNT', sortable: true, hidden: hideCols.includes('PAMOUNT') },
                                { accessor: 'PCITY', title: 'PCITY', sortable: true, hidden: hideCols.includes('PCITY') },
                                { accessor: 'PCOUNTRY', title: 'PCOUNTRY', sortable: true, hidden: hideCols.includes('PCOUNTRY') },
                                { accessor: 'PDISTRICT', title: 'PDISTRICT', sortable: true, hidden: hideCols.includes('PDISTRICT') },
                                { accessor: 'PEARNED', title: 'PEARNED', sortable: true, hidden: hideCols.includes('PEARNED') },
                                { accessor: 'PEMAILID', title: 'PEMAILID', sortable: true, hidden: hideCols.includes('PEMAILID') },
                                { accessor: 'PMOBILE', title: 'PMOBILE', sortable: true, hidden: hideCols.includes('PMOBILE') },
                                { accessor: 'PPINCODE', title: 'PPINCODE', sortable: true, hidden: hideCols.includes('PPINCODE') },
                                { accessor: 'PREDEEMED', title: 'PREDEEMED', sortable: true, hidden: hideCols.includes('PREDEEMED') },
                                { accessor: 'PSTATE', title: 'PSTATE', sortable: true, hidden: hideCols.includes('PSTATE') },
                                { accessor: 'RCONTACTNO', title: 'RCONTACTNO', sortable: true, hidden: hideCols.includes('RCONTACTNO') },
                                { accessor: 'REMARK', title: 'REMARK', sortable: true, hidden: hideCols.includes('REMARK') },
                                { accessor: 'RNAME', title: 'RNAME', sortable: true, hidden: hideCols.includes('RNAME') },
                                { accessor: 'SALEPRICE', title: 'SALEPRICE', sortable: true, hidden: hideCols.includes('SALEPRICE') },
                                { accessor: 'STATE', title: 'STATE', sortable: true, hidden: hideCols.includes('STATE') },
                                { accessor: 'STATECODE', title: 'STATECODE', sortable: true, hidden: hideCols.includes('STATECODE') },
                                { accessor: 'STATUS', title: 'STATUS', sortable: true, hidden: hideCols.includes('STATUS') },
                                { accessor: 'TAMOUNT', title: 'TAMOUNT', sortable: true, hidden: hideCols.includes('TAMOUNT')} ,
                                { accessor: 'TELEPHONE', title: 'TELEPHONE', sortable: true, hidden: hideCols.includes('TELEPHONE') },
                                { accessor: 'TELEPHONE1', title: 'TELEPHONE1', sortable: true, hidden: hideCols.includes('TELEPHONE1') },
                                { accessor: 'TELEPHONE2', title: 'TELEPHONE2', sortable: true, hidden: hideCols.includes('TELEPHONE2') },
                                { accessor: 'TINNO', title: 'TINNO', sortable: true, hidden: hideCols.includes('TINNO') },
                                { accessor: 'TITLE', title: 'TITLE', sortable: true, hidden: hideCols.includes('TITLE') },
                                { accessor: 'TPNOBANK', title: 'TPNOBANK', sortable: true, hidden: hideCols.includes('TPNOBANK') },
                                { accessor: 'TRANSPORT', title: 'TRANSPORT', sortable: true, hidden: hideCols.includes('TRANSPORT') },
                                { accessor: 'TYPE', title: 'TYPE', sortable: true, hidden: hideCols.includes('TYPE') },
                                { accessor: 'UPDATEDBY', title: 'UPDATEDBY', sortable: true, hidden: hideCols.includes('UPDATEDBY') },
                                { accessor: 'UPDATEDON', title: 'UPDATEDON', sortable: true, hidden: hideCols.includes('UPDATEDON') },
                                 ]}
                    
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerEnv;


