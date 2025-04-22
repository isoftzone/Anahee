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


const DelChallan = () => {
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
    const [selectedAgent, setSelectedAgent] = useState("");
    const [selectedFirm, setSelectedFirm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    interface UserData {
        id: number;
        COMPANYID: string;
        AGENTID: string;
        AFIRMNAME: string;
        ACTELEPHONENO: string;
        ACMOBILENO: string;
        ACADDRESSLINE1: string;
        ACADDRESSLINE2: string;
        ACADDRESSLINE3: string;
        STATUS: string;
        AGENTNAME: string;
        ADOB: number;
        APERSONALIDTYPE: string;
        APERSONALID: string;
        APMOBILENO: string;
        APEMAILID: string;
        APADDRESSLINE1: string;
        APADDRESSLINE2: string;
        APADDRESSLINE3: string;
        APCITY: string;
        APSTATE: string;
        APCOUNTRY: string;
        APDISTRICT: string;
        APPINCODE: string;
        ABANKNAME: string;
        AACCOUNTTYPE: string;
        AACCOUNTNO: string;
        AACCOUNTHOLDERNAME: string;
        ABRANCHNAME: string;
        AIFSCCODE: string;
        ACHEQUENO: string;
        ACHEQUEREMARK: string;
        AMICRCODE: string;
        ATPNOBANK: string;
        CREATEDBY: string;
        CREATEDON: string;
        UPDATEDBY: string;
        UPDATEDON: string;
        ACCITY: string;
        ACSTATE: string;
        ACCOUNTRY: string;
        ACDISTRICT: string;
        ACPINCODE: string;
        REMARK: string;
    }

    interface FormData {
        COMPANYID: any;
        AGENTID: any;
        AFIRMNAME: string;
        ACTELEPHONENO: string;
        ACMOBILENO: string;
        ACADDRESSLINE1: string;
        ACADDRESSLINE2: string;
        ACADDRESSLINE3: string;
        STATUS: string;
        AGENTNAME: string;
        ADOB: any;
        APERSONALIDTYPE: string;
        APERSONALID: string;
        APMOBILENO: string;
        APEMAILID: string;
        APADDRESSLINE1: string;
        APADDRESSLINE2: string;
        APADDRESSLINE3: string;
        APCITY: string;
        APSTATE: string;
        APCOUNTRY: string;
        APDISTRICT: string;
        APPINCODE: string;
        ABANKNAME: string;
        AACCOUNTTYPE: string;
        AACCOUNTNO: string;
        AACCOUNTHOLDERNAME: string;
        ABRANCHNAME: string;
        AIFSCCODE: string;
        ACHEQUENO: string;
        ACHEQUEREMARK: string;
        AMICRCODE: string;
        ATPNOBANK: string;
        CREATEDBY: string;
        CREATEDON: string;
        UPDATEDBY: string;
        UPDATEDON: string;
        ACCITY: string;
        ACSTATE: string;
        ACCOUNTRY: string;
        ACDISTRICT: string;
        ACPINCODE: string;
        REMARK: string;
    }

    const [formData, setFormData] = useState<FormData>({
        COMPANYID: '',
        AGENTID: '',
        AFIRMNAME: '',
        ACTELEPHONENO: '',
        ACMOBILENO: '',
        ACADDRESSLINE1: '',
        ACADDRESSLINE2: '',
        ACADDRESSLINE3: '',
        STATUS: '',
        AGENTNAME: '',
        ADOB: '',
        APERSONALIDTYPE: '',
        APERSONALID: '',
        APMOBILENO: '',
        APEMAILID: '',
        APADDRESSLINE1: '',
        APADDRESSLINE2: '',
        APADDRESSLINE3: '',
        APCITY: '',
        APSTATE: '',
        APCOUNTRY: '',
        APDISTRICT: '',
        APPINCODE: '',
        ABANKNAME: '',
        AACCOUNTTYPE: '',
        AACCOUNTNO: '',
        AACCOUNTHOLDERNAME: '',
        ABRANCHNAME: '',
        AIFSCCODE: '',
        ACHEQUENO: '',
        ACHEQUEREMARK: '',
        AMICRCODE: '',
        ATPNOBANK: '',
        CREATEDBY: '',
        CREATEDON: '',
        UPDATEDBY: '',
        UPDATEDON: '',
        ACCITY: '',
        ACSTATE: '',
        ACCOUNTRY: '',
        ACDISTRICT: '',
        ACPINCODE: '',
        REMARK: '',
    });


    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'Agent Name') {
            setSelectedAgent(value);
        } else if (name === 'Agent Firm Name') {
            setSelectedFirm(value);
        } else if (name === 'City') {
            setSelectedCity(value);
        } else if (name === 'State') {
            setSelectedState(value);
        } else if (name === 'Status') {
            setSelectedStatus(value);
        }
    }
    const handleSearch = () => {
        const filteredData = initialRecords.filter(record => {
            return (selectedAgent === "" || record.AGENTNAME === selectedAgent) &&
                (selectedFirm === "" || record.AFIRMNAME === selectedFirm) &&
                (selectedCity === "" || record.APCITY === selectedCity) &&
                (selectedState === "" || record.APSTATE === selectedState) &&
                (selectedStatus === "" || record.STATUS === selectedStatus);
        });
        setRecordsData(filteredData);
    }

    const handleReset = () => {
        setSelectedAgent("");
        setSelectedFirm("");
        setSelectedCity("");
        setSelectedState("");
        setSelectedStatus("");
        setRecordsData(initialRecords.slice(0, 10));
    }

    useEffect(() => {
        setPage(1);
    }, [pageSize]);


    useEffect(() => {
        fetch(`${BASE_URL}/getMaster`)
            .then(response => response.json())
            .then(data => {
                let detail = data;
                setClientData(detail);
                setInitialRecords(data);
                setRecordsData(data)
                setTempData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.AGENTNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.AFIRMNAME.toLowerCase().includes(search.toLowerCase()) ||
                    item.APCOUNTRY.toLowerCase().includes(search.toLowerCase()) ||
                    item.APEMAILID.toLowerCase().includes(search.toLowerCase()) ||
                    item.ACADDRESSLINE1.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.APCITY.toLowerCase().includes(search.toLowerCase()) ||
                    item.APMOBILENO.toLowerCase().includes(search.toLowerCase())
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
        const col: Array<keyof UserData> = ['id', 'COMPANYID', 'AGENTID', 'AFIRMNAME', 'ACTELEPHONENO', 'ACMOBILENO', 'ACADDRESSLINE1', 'STATUS', 'AGENTNAME', 'ADOB', 'APERSONALIDTYPE', 'APERSONALID', 'APMOBILENO', 'APEMAILID', 'APADDRESSLINE1', 'APCITY', 'APSTATE', 'APCOUNTRY', 'APDISTRICT', 'APPINCODE', 'ABANKNAME', 'AACCOUNTTYPE', 'AACCOUNTNO', 'AACCOUNTHOLDERNAME', 'ABRANCHNAME', 'AIFSCCODE', 'ACHEQUENO', 'ACHEQUEREMARK', 'AMICRCODE', 'ATPNOBANK', 'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDBY', 'UPDATEDON', 'ACCITY', 'ACCOUNTRY', 'ACDISTRICT', 'ACPINCODE', 'REMARK'];
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
    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'COMPANYID', 'AGENTID', 'ACTELEPHONENO', 'ACMOBILENO', 'ACADDRESSLINE1', 'STATUS', 'ADOB', 'APERSONALIDTYPE', 'APERSONALID', 'APMOBILENO', 'APADDRESSLINE1', 'APCITY', 'APSTATE', 'APCOUNTRY', 'APDISTRICT', 'APPINCODE', 'ABANKNAME', 'AACCOUNTTYPE', 'AACCOUNTNO', 'AACCOUNTHOLDERNAME', 'ABRANCHNAME', 'AIFSCCODE', 'ACHEQUENO', 'ACHEQUEREMARK', 'AMICRCODE', 'ATPNOBANK', 'CREATEDBY', 'CREATEDON', 'UPDATEDBY', 'UPDATEDBY', 'UPDATEDON', 'ACCITY', 'ACCOUNTRY', 'ACDISTRICT', 'ACPINCODE', 'ACSTATE', 'Remark', 'isActive']);



    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'agentName', title: 'Agent Name' },
        { accessor: 'agentFirmName', title: 'Agent Firm Name' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'dob', title: 'Startdate' },
        { accessor: 'phone', title: 'Phone' },
        { accessor: 'age', title: 'Status' },
        { accessor: 'Remark', title: 'Remark' },
        { accessor: 'AACCOUNTHOLDERNAME', title: 'Account Holder Name' },
        { accessor: 'AACCOUNTNO', title: 'Account No' },
        { accessor: 'AACCOUNTTYPE', title: 'Account Type' },
        { accessor: 'ABANKNAME', title: 'Bank Name' },
        { accessor: 'ABRANCHNAME', title: 'Branch Name' },
        { accessor: 'ACADDRESSLINE1', title: 'Company Address' },
        { accessor: 'ACCITY', title: 'Company City' },
        { accessor: 'ACCOUNTRY', title: 'Company Country' },
        { accessor: 'ACDISTRICT', title: 'Company District' },
        { accessor: 'ACHEQUENO', title: 'Cheque No' },
        { accessor: 'ACHEQUEREMARK', title: 'Cheque Mark' },
        { accessor: 'ACMOBILENO', title: 'Company Contact No' },
        { accessor: 'ACPINCODE', title: 'Company Pincode' },
        { accessor: 'ACSTATE', title: 'Company State' },
        { accessor: 'ACTELEPHONENO', title: 'Company Telephone' },
        { accessor: 'AIFSCCODE', title: 'IFSC Code' },
        { accessor: 'AMICRCODE', title: 'MICR Code' },
        { accessor: 'APADDRESSLINE1', title: 'Agent Address' },
        { accessor: 'APCITY', title: 'City' },
        { accessor: 'APDISTRICT', title: 'District' },
        { accessor: 'APERSONALIDTYPE', title: 'Agent ID Type' },
        { accessor: 'APERSONALID', title: 'Agent ID No' },
        { accessor: 'APMOBILENO', title: 'Personal Contact No' },
        { accessor: 'APPINCODE', title: 'Agent Pincode' },
        { accessor: 'APSTATE', title: 'Agent State' },
        { accessor: 'ATPNOBANK', title: 'Bank ATP No' },
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
                {/* <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-5">
                        <div className="md:flex-auto flex-1">
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
                        </div>
                    </div>
                </div> */}
               <div className="container-fluid ">
      <table className="table table-responsive">
        <thead className=''>
          <tr className='row'>
            <th>
              <label>Customer
                <select name="Customer"
                  className="form-select"
                  value={selectedAgent}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AGENTNAME}>{record.AGENTNAME}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>From Date
                <input type="date" className="form-control" />
              </label>
            </th>
            <th>
              <label>To Date
                <input type="date" className="form-control" />
              </label>
            </th>
            <th>
              <label>Bill No. From
                <input type="text" className="form-control" />
              </label>
            </th>
            <th>
              <label>To
                <input type="text" className="form-control" />
              </label>
            </th>
            <th>
              <label>Mode
                <select name="Mode"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
          </tr>
        </thead>
        <thead>
          <tr className='row'>
            <th>
              <label>Product
                <select name="Product"
                  className="form-select"
                  value={selectedAgent}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AGENTNAME}>{record.AGENTNAME}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>Brand
                <select name="Brand"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
            <th>
              <label>Sup Color
                <select name="Sup Color"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
            <th>
              <label>Color
                <select name="Color"
                  className="form-select"
                  value={selectedCity}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.APCITY}>{record.APCITY}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>Size
                <select name="Size"
                  className="form-select"
                  value={selectedState}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.APSTATE}>{record.APSTATE}</option>
                  ))} */}
                </select>
              </label>
            </th>
          </tr>
        </thead>
        <thead>
          <tr className='row'>
            <th>
              <label>Style
                <select name="Style"
                  className="form-select"
                  value={selectedAgent}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AGENTNAME}>{record.AGENTNAME}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>Sub Group
                <select name="Sub Group"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
            <th>
              <label>Group
                <select name="Group"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
            <th>
              <label>Gender
                <select name="Gender"
                  className="form-select"
                  value={selectedCity}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.APCITY}>{record.APCITY}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>Buyer
                <select name="Buyer"
                  className="form-select"
                  value={selectedState}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.APSTATE}>{record.APSTATE}</option>
                  ))} */}
                </select>
              </label>
            </th>
          </tr>
        </thead>
        <thead>
          <tr className='row'>
            <th>
              <label>Sub Category
                <select name="Sub Category"
                  className="form-select"
                  value={selectedAgent}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AGENTNAME}>{record.AGENTNAME}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>Category
                <select name="Category"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
            <th>
              <label>Material
                <select name="Material"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
            <th>
              <label>Company
                <select name="Company"
                  className="form-select"
                  value={selectedCity}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.APCITY}>{record.APCITY}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>Season
                <select name="Season"
                  className="form-select"
                  value={selectedState}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.APSTATE}>{record.APSTATE}</option>
                  ))} */}
                </select>
              </label>
            </th>
          </tr>
        </thead>
        <thead>
          <tr className='row'>
            <th>
              <label>Packing
                <select name="Packing"
                  className="form-select"
                  value={selectedAgent}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AGENTNAME}>{record.AGENTNAME}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>Promotion
                <select name="Promotion"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
            <th>
              <label>Discount
                <select name="Discount"
                  className="form-select"
                  value={selectedFirm}
                  onChange={handleDropdownChange}
                >
                  <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.AFIRMNAME}>{record.AFIRMNAME}</option>
                  ))}
                </select>
              </label>
            </th>
            <th>
              <label>Scheme
                <select name="Scheme"
                  className="form-select"
                  value={selectedCity}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.APCITY}>{record.APCITY}</option>
                  ))} */}
                </select>
              </label>
            </th>
            <th>
              <label>Event
                <select name="Event"
                  className="form-select"
                  value={selectedState}
                  onChange={handleDropdownChange}
                >
                  {/* <option value="">--ALL--</option>
                  {initialRecords.map((record, index) => (
                    <option key={index} value={record.APSTATE}>{record.APSTATE}</option>
                  ))} */}
                </select>
              </label>
            </th>
          </tr>
        </thead>
      </table>
    </div>  

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
                            { accessor: 'AGENTNAME', title: 'Agent Name', sortable: true, hidden: hideCols.includes('agentName') },
                            { accessor: 'AFIRMNAME', title: 'Agent Firm Name', sortable: true, hidden: hideCols.includes('agentFirmName') },
                            { accessor: 'APEMAILID', title: 'Email', sortable: true, hidden: hideCols.includes('email') },
                            { accessor: 'APMOBILENO', title: 'Phone', sortable: true, hidden: hideCols.includes('phone') },
                            { accessor: 'APCOUNTRY', title: 'Country', sortable: true, hidden: hideCols.includes('APCOUNTRY') },
                            { accessor: 'APCITY', title: 'City', sortable: true, hidden: hideCols.includes('APCITY') },
                            { accessor: 'APSTATE', title: 'State', sortable: true, hidden: hideCols.includes('APSTATE') },
                            { accessor: 'APDISTRICT', title: 'District', sortable: true, hidden: hideCols.includes('APDISTRICT') },
                            { accessor: 'APADDRESSLINE1', title: 'Agent Address', sortable: true, hidden: hideCols.includes('APADDRESSLINE1') },
                            { accessor: 'APERSONALIDTYPE', title: 'Agent ID Type', sortable: true, hidden: hideCols.includes('APERSONALIDTYPE') },
                            { accessor: 'APERSONALID', title: 'Agent ID No', sortable: true, hidden: hideCols.includes('APERSONALID') },
                            { accessor: 'AACCOUNTHOLDERNAME', title: 'Account Holder Name', sortable: true, hidden: hideCols.includes('AACCOUNTHOLDERNAME') },
                            { accessor: 'AACCOUNTTYPE', title: 'Account Type', sortable: true, hidden: hideCols.includes('AACCOUNTTYPE') },
                            { accessor: 'AACCOUNTNO', title: 'Account Number', sortable: true, hidden: hideCols.includes('AACCOUNTNO') },
                            { accessor: 'ABANKNAME', title: 'Bank Name', sortable: true, hidden: hideCols.includes('ABANKNAME') },
                            { accessor: 'ABRANCHNAME', title: 'Branch Name', sortable: true, hidden: hideCols.includes('ABRANCHNAME') },
                            { accessor: 'AIFSCCODE', title: 'IFSC Code', sortable: true, hidden: hideCols.includes('AIFSCCODE') },
                            { accessor: 'AMICRCODE', title: 'MICR Code', sortable: true, hidden: hideCols.includes('AMICRCODE') },
                            { accessor: 'ACHEQUENO', title: 'Cheque No', sortable: true, hidden: hideCols.includes('ACHEQUENO') },
                            { accessor: 'ACHEQUEREMARK', title: 'Cheque Remark', sortable: true, hidden: hideCols.includes('ACHEQUEREMARK') },
                            { accessor: 'ACADDRESSLINE1', title: 'Company Address', sortable: true, hidden: hideCols.includes('ACADDRESSLINE1') },
                            { accessor: 'ACCITY', title: 'Company City', sortable: true, hidden: hideCols.includes('ACCITY') },
                            { accessor: 'ACCOUNTRY', title: 'Company Country', sortable: true, hidden: hideCols.includes('ACCOUNTRY') },
                            { accessor: 'ACDISTRICT', title: 'Company District', sortable: true, hidden: hideCols.includes('ACDISTRICT') },
                            { accessor: 'ACSTATE', title: 'Company State', sortable: true, hidden: hideCols.includes('ACSTATE') },
                            { accessor: 'ACMOBILENO', title: 'Company Contact No', sortable: true, hidden: hideCols.includes('ACMOBILENO') },
                            { accessor: 'ACTELEPHONENO', title: 'Company Telephone', sortable: true, hidden: hideCols.includes('ACTELEPHONENO') },
                            { accessor: 'ACPINCODE', title: 'Company Pincode', sortable: true, hidden: hideCols.includes('ACPINCODE') },
                            { accessor: 'CREATEDBY', title: 'Created By', sortable: true, hidden: hideCols.includes('CREATEDBY') },
                            { accessor: 'CREATEDON', title: 'Created On', sortable: true, hidden: hideCols.includes('CREATEDON') },
                            { accessor: 'REMARK', title: 'Remark', sortable: true, hidden: hideCols.includes('Remark') },
                            { accessor: 'UPDATEDBY', title: 'Updated By', sortable: true, hidden: hideCols.includes('UPDATEDBY') },
                            { accessor: 'UPDATEDON', title: 'Updated On', sortable: true, hidden: hideCols.includes('UPDATEDON') },
                            { accessor: 'STATUS', title: 'Status', sortable: true, hidden: hideCols.includes('age') },
                            {
                                accessor: 'ADOB',
                                title: 'DOB',
                                sortable: true,
                                hidden: hideCols.includes('dob'),
                                // render: ({ dob }) => <div>{formatDate(dob)}</div>,
                            }
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

export default DelChallan;